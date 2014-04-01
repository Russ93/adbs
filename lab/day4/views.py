class Views(object):
	def __init__(self):
		pass

	def users(self,ret):
		html = '''<h2>'''+ret['user']['fullname']+'''</h2>
		<ul class='col-sm-10 col-sm-offset-1'>'''
		for cat in ret['cats']:
			html = html+"<li><a href='/user/"+ret['user']['username']+"/"+cat+"'><pre>"+cat+"</pre></a></li>"
		html = html+'''</ul>'''
		return self.__head+html+self.__foot

	def category(self,ret):
		html = "<h2>"+ret['user']['fullname']+'''</h2>
		<ul class='col-sm-8 col-sm-offset-2 posts'>'''
		for post in ret['blogs']:
			strang = '''<li class='col-sm-12' msgId="{post[id]}" >
				<h3 class='col-sm-6'>{post[title]}</h3>
				<time class='col-sm-4' datetime='{post[posted]}'>{post[posted]}</time>
				<button class='btn btn-default edit'>edit</button>
				<p class='col-sm-12'>{post[text]}</p>
			</li>'''
			html = html+strang.format(**locals())
		html = html+'</ul>'
		return self.__head+html+self.__foot