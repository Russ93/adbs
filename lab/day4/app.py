# Russell Schlup
# ADB
# March 12, 2014

import bottle
import views
import pymongo
from bottle import error, route, run, request, response, static_file, template, SimpleTemplate
import hashlib
import json
import uuid
import time

connection = pymongo.Connection("mongodb://localhost:27017", safe=True)
db = connection.bloggah
m = db.messages
u = db.users

views = views.Views()

@route('/')
def home():
	return template('views/index') #('',variables=value)

# --------------- Get Users
@route('/getUsers/<fullname>')
def getUsers(fullname):
	obj = dict()
	arr =[]
	for r in u.find({"fullname":{'$regex':fullname}},{'fullname':1,'username':1}):
		obj['username'] = r['username']
		obj['fullname'] = r['fullname']
		arr.append(obj)
	return json.dumps(arr)

# --------------- new user
@route('/user/new',method='GET')
def newUser():
	ret = dict()
	check = True
	ret['fname'] = request.query.get('fname')
	ret['lname'] = request.query.get('lname')
	ret['username'] = request.query.get('username')
	ret['password'] = request.query.get('password')
	for key in ret:
		if key == None:
			check = False
	if check:
		doc = {"id" : str(uuid.uuid4()), "fullname" : ret['fname']+' '+ret['lname'], "username" : ret['username'], "password" : hashlib.sha224(ret['password']).hexdigest() }
		u.insert(doc,safe=True)
		ret['Success'] = 'The user as been added'
	else:
		ret['error'] = 'One of the field is filled out incorrectly'
	return json.dumps(ret)

# --------------- Sign In
@route('/signin',method='GET')
def signIn():
	ret = dict()
	ret['username'] = request.query.get('username')
	ret['password'] = request.query.get('password')
	ret['has'] = hashlib.sha224(ret['password']).hexdigest()
	user = u.find_one({'username':ret['username'],'password':hashlib.sha224(ret['password']).hexdigest()},{'id':1,'fullname':1})
	if user != None:
		user.pop('_id')
		ret['user'] = user['id']
		ret['fullname'] = user['fullname']
		response.set_cookie('id', ret['user'])
		ret['cookie'] = request.get_cookie('id')
		ret['success'] = 'Welcome In'
	else:
		ret['Error'] = 'Username of Password is not right'
	return json.dumps(ret)

# --------------- get categories
@route('/user/<username>')
def categories(username):
	#ret stands for return
	ret = dict()
	# finds the user name
	ret['user'] = u.find_one({"username":username},{'id':1,'fullname':1,'username':1})
	# checks if a user was returned
	if ret['user'] != None:
		# Removes the annoying _id
		ret['user'].pop('_id')
		# init an arra for categories
		ret['cats'] = []
		for cats in m.find({'author':ret['user']['id']}).distinct('category'):
			# append the categories
			ret['cats'].append(cats)
	else:
		ret['error'] = "That user doesn't exist"
	return json.dumps(ret)

# --------------- get messages
@route('/user/<username>/<cat>')
def ret(username,cat):
	check = ''
	ret = dict()
	ret['user'] = u.find_one({"username":username},{'id':1,'fullname':1,'username':1})
	ret['cat'] = m.find_one({'category':cat},{'category':1})
	if ret['user'] != None:
		ret['user'].pop('_id')
		if ret['cat'] != None:
			ret['cat'].pop('_id')
			ret['blogs'] = []
			for o in m.find({'author':ret['user']['id'],'category':cat}):
				obj = dict()
				obj['id'] = o['id']
				obj['title'] = o['title']
				obj['text'] = o['text']
				obj['posted'] = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(o['posted']))
				obj['category'] = o['category']
				ret['blogs'].append(obj)
		else:
			ret['error'] = "That category doesn't exist"	
	else:
		ret['error'] = "That user doesn't exist"
	return json.dumps(ret)


# --------------- update your message
@route('/update/<id>/<title>/<text>/<category>')
def update(id,title,text,category):
	check = ''
	ret = dict()
	user = m.find_one({"id":id},{'id':1})
	if user != None:
		m.update({"id":id}, {"$set":{"title":title,"text":text,"category":category}}, safe=True)
		ret['success'] = 'The message was updated'
	else:
		ret['error'] = "That blog Doesn't Exist"
	return json.dumps(ret)

# --------------- delete the message
@route('/delete/<id>')
def delete(id):
	ret = dict()
	user = m.find_one({"id":id},{'id':1})
	if user != None:
		m.remove({"id":id})
		ret['success'] = 'The message was removed'
	else:
		ret['error'] = "That blog Doesn't Exist"
	return json.dumps(ret)

# --------------- get comments
@route('/message/<id>')
def info(id):
	ret = dict()
	ret['message'] = m.find_one({"id":id})
	if ret['message'] != None:
		# convert to local time
		ret['message']['posted'] = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(ret['message']['posted']))
		# converts all time in comments to local time
		for comment in ret['message']['comments']:
			comment['posted'] = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(comment['posted']))
		ret['message'].pop('_id')
	else:
		ret['error'] = "That post doesn't exist"
	return json.dumps(ret)

# --------------- write comments
@route('/comment/<id>/<authorId>/<text>')
def comment(id,authorId,text):
	ret = dict()
	ret['message'] = m.find_one({"id":id},{'id':1})

	ret['user'] = u.find_one({"id":authorId},{'fullname':1})
	
	if ret['message'] != None:
		if ret['user'] != None:
			obj =dict()
			obj['authorId'] = authorId
			obj['authorName'] = ret['user']['fullname']
			obj['text'] = text
			obj['posted'] = int(time.time())
			m.update({'id':id},{'$push':{'comments':obj}})
			return "The comment was posted"
		else:
			ret['error'] = "that user doesn't exist"
	else:
		ret['error'] = "that post doesn't exist"
	return json.dumps(ret)

# --------------- write a message
@route('/user/<username>/new/<title>/<text>/<category>')
def new(username,title,text,category):
	ret = dict()
	ret['user'] = u.find_one({"username":username},{'id':1})
	if ret['user'] != None:
		ret['user'].pop('_id')
		doc = {'author':ret['user']['id'], 'id':str(uuid.uuid4()), 'title':title, 'text':text, 'posted': 0, 'category':category, 'comments': []}
		m.insert(doc,safe=True)
		ret['success'] = 'Your blog has been written'
	else:
		ret['error'] = "That user doesn't exist"
	return json.dumps(ret)

# Statics files for css and javascript
@route('/public/<filename>')
def server_static(filename):
	return static_file(filename, root='public/')

@error(404)
def error404(error):
	return 'Nothing here, sorry'

# Run the server
run(host='localhost', port=3825, debug=True, reloader=True)