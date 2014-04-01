// ---------- Globals
var global = {}
$('document').ready(function(){
	//	CRUD for the messages
	global.rud = "<div id='close'></div><form method='get' id='pMsg' action='index.php' class='col-md-8 col-md-offset-2'><ul>"
	global.cookie = {}
	global.cookie.id = '1e911749-2ce6-491e-ac85-cf1d6c0d007b'
	global.cookie.name = 'Anonymous'
	var sourceArr = [];
	var check = true;
	$('#getUsers').keyup(function(){
		$.ajax({
			url: '/getUsers/'+$('#getUsers').val(),
			dataType: 'json',
			success: function(response){
				// console.log(response)
				for(var i in response){
					check = true;
					$('#userId').val(response[0].username)
					for (var a in sourceArr){
						if(sourceArr[a] == response[i].fullname){check = false}
					}
					if(check){sourceArr.push(response[i].fullname)}
				}
			},
			error: function (xhr) {
				console.log(xhr.responseText);
			}
		})//.ajax
	})
	$('#userSearch').submit(function(event){
		event.preventDefault()
		getcats($('#userId').val(),'index')
	})
	$('#getUsers').autocomplete({source:sourceArr})

	$('#form').submit(function(event){
		event.preventDefault()
		newUser($(this).serialize())
	})
	$('#signIn').submit(function(event){
		event.preventDefault()
		signIn($(this).serialize())
	})

})// Document
// --------------- Model ---------------//
function newUser(ser){
	$.ajax({
		url: '/user/new',
		method: 'get',
		data: ser,
		success: function(response){
			console.log(response)
		},error: function (xhr){console.log(xhr.responseText);}
	})
}
function signIn(serr){
	$.ajax({
		url: '/signin',
		method: 'get',
		data: serr,
		success: function(response){
			response = JSON.parse(response)
			global.cookie = {id: response.cookie, user: response.username, name:response.fullname}
			getcats(global.cookie.user)
			console.log(response)
		},error: function (xhr){console.log(xhr.responseText);}
	})
}
function writecomment(id,text,user,cat){
	authorId = global.cookie.id
	$.ajax({
		url: '/comment/'+id+'/'+authorId+'/'+text,
		success: function(response){
			getmessages(user,cat)
		},error: function (xhr){console.log(xhr.responseText);}
	})

}
function getUserInfo(ret){
	$('#content').html(userView(ret))
	$('.category').click(function(){getmessages(ret.user.username,$(this).children('pre').html())})
	$('.new').click(function(){
		console.log('clicked')
		$('#pop').html(global.rud+"<button class='btn btn-primary'>Save</button></form>")
		$('#close').click(function(){$('#pop').empty()})
		$('.sibLabel').click(function(){
			$(this).parent().parent().children().first().html(add)
			$(this).remove()})
		$('form').submit(function(event){
			event.preventDefault()
			newPost(ret.user.username,$('#header').val(),$('#msg').val(),$('#category').val())
			$('#pop').empty()
		})
	})
}
function getmessages(user,cat){
	$.ajax({
		url: '/user/'+user+'/'+cat,
		dataType: 'json',
		success: function(response){
			$('*').unbind()
			add = "<label>Category</label><input type='text' name='header' id='category' class='form-control' />"
			$('#content').html(messagesView(response))
			$('.edit').click(function(){ 
				ID = $(this).parent().attr('msgId')
				console.log(ID)
				$('#pop').html(global.rud+"<a id='del'>delete</a><button class='btn btn-primary'>Save</button></form>");
				$('#header').val($(this).siblings('h3').text())
				$('#msg').val($(this).siblings('p').text())
				$('#close').click(function(){$('#pop').empty()})
				$('#del').click(function(){
					$('#pop').empty()
					deletePost(user,cat,ID)
				})
				$('.sibLabel').click(function(){
					$(this).parent().parent().children().first().html(add)
					$(this).remove()})
				$('form').submit(function(event){
					event.preventDefault()
					editpost(user,ID,$('#header').val(),$('#msg').val(),$('#category').val())
					$('#pop').empty()
				})
			})
			$('.showcomment').click(function(){
				getComments(user,cat,$(this).parent().parent().attr('msgId'),this)
			})
			$('.new').click(function(){
				$('#pop').html(global.rud+"<button class='btn btn-primary'>Save</button></form>")
				$('#close').click(function(){$('#pop').empty()})
				$('.sibLabel').click(function(){
					$(this).parent().parent().children().first().html(add)
					$(this).remove()})
				$('form').submit(function(event){
					event.preventDefault()
					newPost(user,$('#header').val(),$('#msg').val(),$('#category').val())
					$('#pop').empty()
				})
			})
		},
		error: function (xhr) {
			console.log(xhr.responseText);
		}
	})//.ajax
}
function getComments(user,cat,id,self){
	$.ajax({
		url: '/message/'+id,
		dataType: 'json',
		success: function(response){
			console.log(response)
			$(self).parent().html(commentView(response))
			$('.postc').click(function(){
				form = '<label>'+global.cookie.name+'</label>'
				form +=	'<textarea class="col-sm-12 form-control"></textarea>'
				form +=	'<button class="commpost btn btn-primary">Submit</button>'
				$(this).parent().prepend(form)
				$(this).remove()
				$('.close').click(function(){})
				$('.commpost').click(function(){
					writecomment($(this).parent().parent().parent().attr('msgid'),$(this).siblings('textarea').val(),$('#userpage').val(),$('#catpage').val())//authorid
				})
			})
			$('.hcom').click(function(){
				// $('*').unbind()
				console.log('I was clicked')
				getmessages(user,cat)
			})
		},
		error: function (xhr) {console.log(xhr.responseText)}
	})//.ajax
}
function editpost(user,id,title,text,category){
	$.ajax({
		url: '/update/'+id+'/'+title+'/'+text+'/'+category,
		datatype: 'json',
		success: function(response){
			$('*').unbind()
			getmessages(user,category)
		},
		error: function (xhr) {console.log(xhr.responseText)}
	})
}
function newPost(user,title,text,category){
	$.ajax({
		url: '/user/'+user+'/new/'+title+'/'+text+'/'+category,
		datatype: 'json',
		success: function(){
			$('*').unbind()
			getmessages(user,category)
		},
		error: function (xhr) {console.log(xhr.responseText)}
	})
}
function deletePost(user,cat,id){
	$.ajax({
		url: '/delete/'+id ,
		datatype: 'json',
		success: function(){

			getmessages(user,cat)
		},error:function(xhr){console.log(xhr.responseText)}
	})
}
function getcats(user){
	$.ajax({
		url: '/user/'+user,
		datatype: 'json',
		success: function(response){
			response = JSON.parse(response)
			console.log(response)
			html = '<li class="col-sm-8"><label>Category</label><select class="col-sm-8 form-control " id="category">'
			for (i in response.cats){
				html += '<option>'+response.cats[i]+'</option>'
			}
			html += "</select></li><li class='col-sm-4'><a class='btn btn-default col-sm-12 sibLabel'>Add New</a></li>"
			html += "<li class='col-sm-12'><label>Header</label><input type='text' name='header' id='header' class='form-control' /></li>"
			html += "<li class='col-sm-12'><label>Message</label><textarea name='message' id='msg' class='form-control'></textarea></li></ul>"
			global.rud += html
			getUserInfo(response)
		},
		error: function (xhr) {return(xhr.responseText)}
	})
}
// --------------- Views ---------------//
function userView(ret){
	html = "<h2>"+ret.user.fullname+"</h2>"
	html += "<button class='btn btn-default col-sm-4 new'>Create New Post</button>"
	html += '<ul class="col-sm-8 col-sm-offset-2">'
	for (i in ret.cats){
		html += "<li class='category'><pre>"+ret.cats[i]+"</pre></li>"
	}
	html += "</ul>"
	return html
}
function messagesView(ret){
	html = "<h2>"+ret.user.fullname+"</h2>"
	html += "<input type='hidden' id='userpage' value='"+ret.user.username+"'>"
	html += "<input type='hidden' id='catpage' value='"+ret.cat.category+"'>"
	html += "<button class='btn btn-default col-sm-4 new'>Create New Post</button>"
	html += "<ul class='col-sm-8 col-sm-offset-2 posts'>"
	for (i in ret.blogs){
		html += '<li class="col-sm-12" msgId="'+ret.blogs[i].id+'">'
		html += "<h3 class='col-sm-6'>"+ret.blogs[i].title+"</h3>"
		html += "<time class='col-sm-4' datetime='"+ret.blogs[i].posted+"'>"+ret.blogs[i].posted+"</time>"
		html += "<button class='btn btn-default edit'>edit</button>"
		html += "<p class='col-sm-12'>"+ret.blogs[i].text+'</p>'
		html += '<ul class="col-sm-12 comments">'
		html += '<a class="col-sm-2 showcomment" msgid="'+ret.blogs[i].id+'">Comments</a>'
		html += '</ul></li>'
	}
	html += '</ul>'

	return html
}
function commentView(ret){
	html = '<div class="col-sm-12 comm"><a class="postc col-sm-12">Post a comment</a></div>'
	for(i in ret.message.comments){
		html += '<li class="col-sm-12">'
			html += '<h4 class="col-sm-6">'+ret.message.comments[i].authorName+'</h4>'
			html += '<time class="col-sm-6" datetime="'+ret.message.comments[i].posted+'">'+ret.message.comments[i].posted+'</time>'
			html += '<p class="col-sm-12">'+ret.message.comments[i].text+'</p>'
		html += '</li>'
	}
	html += '<a class="col-sm-offset-9 col-sm-3 hcom">Hide Comments</a>'
	return html
}