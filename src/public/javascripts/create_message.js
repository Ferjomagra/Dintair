var message = document.forms['formu']['message']

var error_message = document.getElementById('error_message')

message.addEventListener('blur', messageVerify, true)


function Validate(){
	if(message.value == ''){
		message.style.border = '1px solid #ff4d4d'
		error_message.textContent = 'Escriba un mensaje';
		return false;
	}
}

function messageVerify(){
	if(messageVerify.value != ""){
		message.style.border = '1px solid #bfbfbf';
		error_message.innerHTML = "";
		return true;
	}
}