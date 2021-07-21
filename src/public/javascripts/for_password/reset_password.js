var password = document.forms['formu']['password'];

var error_password = document.getElementById('error_password')

password.addEventListener('blur', passwordVerify, true)

function Validate(){
	if(password.value == ""){
		password.style.border = '1px solid #ff4d4d';
		error_password.textContent = 'Ingrese una contraseña.';
		
		return false;
	}
}

function passwordVerify(){
	if(passwordVerify.value != ""){
		password.style.border = '1px solid #33adff';
		error_password.innerHTML = "";
		return true;
	}
}