var text_suggest = document.forms['formu']['text_suggest'];
var mail = document.forms['formu']['mail'];
var name_p = document.forms['formu']['name_p'];

var error_name_p = document.getElementById('error_name_p');
var error_mail = document.getElementById('error_mail');
var error_text_suggest = document.getElementById('error_text_suggest');


name_p.addEventListener('blur', name_pVerify, true);
mail.addEventListener('blur', mailVerify, true);
text_suggest.addEventListener('blur', text_suggestVerify, true);


function Validate(){

	if(name_p.value == ""){
		name_p.style.border = '1px solid #ff4d4d';
		error_name_p.textContent = 'Escriba su primer nombre y apellido.';
		
		return false;
	}

	if( !(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(mail.value)) ){
		mail.style.border = '1px solid #ff4d4d';
		error_mail.textContent = 'Escriba un correo electrónico válido.';
		
		return false;
	}

	if(text_suggest.value == ""){
		text_suggest.style.border = '1px solid #ff4d4d';
		error_text_suggest.textContent = 'Ecribe una explicación';
		return false;
	}
}

function name_pVerify(){
	if(name_pVerify.value != ""){
		name_p.style.border = '1px solid #cccccc';
		error_name_p.innerHTML = "";
		return true;
	}
}
function mailVerify(){
	if((/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(mail.value))){
		mail.style.border = '1px solid #cccccc';
		error_mail.innerHTML = "";
		return true;
	}
}
function text_suggestVerify(){
	if(text_suggestVerify.value != ""){
		text_suggest.style.border = '1px solid #bfbfbf';
		error_text_suggest.innerHTML = "";
		return true;
	}
}