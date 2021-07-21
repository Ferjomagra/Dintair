var comp_name = document.forms['formu']['comp_name'];
var rubroS = document.forms['formu']['rubroS'];
var contacto = document.forms['formu']['contacto'];
var email_contacto = document.forms['formu']['email_contacto'];


var error_comp_name = document.getElementById('error_comp_name');
var error_rubroS = document.getElementById('error_rubroS');
var error_contacto = document.getElementById('error_contacto');
var error_email_contacto = document.getElementById('error_email_contacto');


comp_name.addEventListener('blur', comp_nameVerify, true);
rubroS.addEventListener('blur', rubroSVerify, true);
contacto.addEventListener('blur', contactoVerify, true);
email_contacto.addEventListener('blur', email_contactoVerify, true);





function Validates(){
	if(comp_name.value == ""){
		comp_name.style.border = '1px solid #ff4d4d';
		error_comp_name.textContent = 'Ecriba el nombre de la empresa';
		return false;
	}

	if(rubroS.value == null || rubroS.value == 0){
		rubroS.style.border = '1px solid #ff4d4d';
		error_rubroS.textContent = 'Seleccione el rubro de la empresa';
		return false;
	}

	if(contacto.value == ""){
		contacto.style.border = '1px solid #ff4d4d';
		error_contacto.textContent = 'Agrege el nombre del contacto';
		return false;
	}
	if( !(/\w+([-+.']\w+)*@\w+([-.]\w+)/.test(email_contacto.value)) ){
		email_contacto.style.border = '1px solid #ff4d4d';
		error_email_contacto.textContent = 'Escriba el correo electrónico del contacto.';
		return false;
	}
	

}

function comp_nameVerify(){
	if(comp_nameVerify.value != ""){
		comp_name.style.border = '1px solid #bfbfbf';
		error_comp_name.innerHTML = "";
		return true;
	}
}

function rubroSVerify(){
	if(rubroSVerify.value != ""){
		rubroS.style.border = '1px solid #bfbfbf';
		error_rubroS.innerHTML = "";
		return true;
	}
}

function contactoVerify(){
	if(contactoVerify.value != ""){
		contacto.style.border = '1px solid #bfbfbf';
		error_contacto.innerHTML = "";
		return true;
	}
}

function email_contactoVerify(){
	if((/\w+([-+.']\w+)*@\w+([-.]\w+)/.test(email_contacto.value))){
		email_contacto.style.border = '1px solid #bfbfbf';
		error_email_contacto.innerHTML = "";
		return true;
	}
}
