var username = document.forms['formu']['username'];
var error_comp_email = document.getElementById('error_comp_email');
username.addEventListener('blur', comp_usernameVerify, true);


function Validate(){
	
	if( !(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(username.value)) ){
		username.style.border = '1px solid #ff4d4d';
		return false;
	}

}

function comp_usernameVerify(){
	if((/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(username.value))){
		username.style.border = '1px solid #cccccc';
		error_comp_email.innerHTML = "";
		return true;
	}
}
