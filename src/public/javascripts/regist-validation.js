var username = document.forms['formu']['username'];
var password = document.forms['formu']['password'];
var full_name = document.forms['formu']['full_name'];


var error_comp_email = document.getElementById('error_comp_email');
var error_comp_pass = document.getElementById('error_comp_pass');
var error_full_name = document.getElementById('error_full_name');



username.addEventListener('blur', usernameVerify, true);
password.addEventListener('blur', comp_passVerify, true);
full_name.addEventListener('blur', full_nameVerify, true);





function Validate(){
	if(full_name.value == ""){
		full_name.style.border = '1px solid #ff4d4d';
		error_full_name.textContent = 'Escriba su primer nombre y apellido.';
		
		return false;
	}

	if( !(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(username.value)) ){
		username.style.border = '1px solid #ff4d4d';
		error_comp_email.textContent = 'Escriba un correo electrónico válido.';
		
		return false;
	}
	if(password.value == ""){
		password.style.border = '1px solid #ff4d4d';
		error_comp_pass.textContent = 'Escriba una contraseña.';
		
		return false;
	}
}

function full_nameVerify(){
	if(full_nameVerify.value != ""){
		full_name.style.border = '1px solid #cccccc';
		error_full_name.innerHTML = "";
		return true;
	}
}

function usernameVerify(){
	if((/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(username.value))){
		username.style.border = '1px solid #cccccc';
		error_comp_email.innerHTML = "";
		return true;
	}
}
function comp_passVerify(){
	if(comp_passVerify.value != ""){
		password.style.border = '1px solid #cccccc';
		error_comp_pass.innerHTML = "";
		return true;
	}
}

