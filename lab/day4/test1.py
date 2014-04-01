import bottle
import pymongo
from bottle import route, run, request, static_file

@route('/')
def home():
	return static_file('home.html', 'views')

@route('/hello')
def hello():
    return "Hello World!"

@route('/ret')
def ret():
	res = dict()
	res['html'] = static_file('home.html', 'views')
	res['args'] = { 'id':request.query['id'] }
	return res

# Statics files for css and javascript
@route('/static/:filename#.*#')
def send_static(filename):
    return static_file('home.html', 'views')

# Run the server
run(host='localhost', port=8080, debug=True)