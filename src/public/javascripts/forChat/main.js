$(function(){


	//Socket iniciado
	var socket = io()

	//variables
	var messages = $('#message')
	var chat = $('#chat')

	messages.focus()

	$('#uploadForm').submit(function(e){
		

		//chat.append(messages.val() + '<br/>')
		


		//socket.emit('mensaje-del-cliente', messages.val())

		messages.val('')
	});

	/*socket.on('mensaje-del-servidor', function(data){
		chat.append(data + '<br/>');
	})*/

});