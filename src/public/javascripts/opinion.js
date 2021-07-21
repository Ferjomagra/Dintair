var country_message = document.forms['formu']['country'];
var prod_message = document.forms['formu']['prod_message'];
var mail_message = document.forms['formu']['mail_message'];

var error_country = document.getElementById('error_country');
var error_prod_message = document.getElementById('error_prod_message');
var error_mail_message = document.getElementById('error_mail_message');


country_message.addEventListener('blur', country_messageVerify, true);
prod_message.addEventListener('blur', prod_messageVerify, true);


function Validate() {
	if(country_message.value == null || country_message.value == 0){
		country_message.style.border = '1px solid #ff4d4d';
		error_country.textContent = 'Seleccione un país de la lista';
		return false;
	}

	if(prod_message.value == ''){
		prod_message.style.border = '1px solid #ff4d4d';
		error_prod_message.textContent = 'Escribe qué producto o servicio ofreces';
		return false;
	}
}

function country_messageVerify(){
	if(country_message.value != ''){
		country_message.style.border = '1px solid #d9d9d9';
		error_country.innerHTML = '';
		return true;
	}
}

function prod_messageVerify(){
	if(prod_message.value != ''){
		prod_message.style.border = '1px solid #d9d9d9';
		error_prod_message.innerHTML = '';
		return true;
	}
}