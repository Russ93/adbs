import bottle
import pymongo
from bottle import route, run, request, static_file

@route('/hello')
def hello():
    return "Hello World!"

@route('/ret')
def ret():
    return { 'id':request.query['id'] }

@route('/index')
def index():
	return static_file('test1.html','views')

run(host='localhost', port=8080, debug=True)