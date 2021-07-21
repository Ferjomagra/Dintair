var name_serv = document.forms['formu']['name_serv'];
var tipo_serv = document.forms['formu']['tipo_serv'];
var desc_serv = document.forms['formu']['desc_serv'];
var origin_serv = document.forms['formu']['origin_serv']


var error_name_serv = document.getElementById('error_name_serv');
var error_tipo_serv = document.getElementById('error_tipo_serv');
var error_desc_serv = document.getElementById('error_desc_serv');
var error_origin_serv = document.getElementById('error_origin_serv');



name_serv.addEventListener('blur', name_servVerify, true);
tipo_serv.addEventListener('blur', tipo_servVerify, true);
desc_serv.addEventListener('blur', desc_servVerify, true);
origin_serv.addEventListener('blur', origin_servVerify, true);




function Validate(){
	if(name_serv.value == ""){
		name_serv.style.border = '1px solid #ff4d4d';
		error_name_serv.textContent = 'Ecriba el nombre de su servicio';
		return false;
	}
	if(tipo_serv.value == ""){
		tipo_serv.style.border = '1px solid #ff4d4d';
		error_tipo_serv.textContent = 'Indique el tipo de servicio que ofrece';
		return false;
	}
	if(desc_serv.value == ""){
		desc_serv.style.border = '1px solid #ff4d4d';
		error_desc_serv.textContent = 'Describa su servicio';
		return false;
	}
	if(origin_serv.value == ""){
		origin_serv.style.border = '1px solid #ff4d4d';
		error_origin_serv.textContent = 'Ingrese el país y la ciudad de origen';
		return false;
	}

}

function name_servVerify(){
	if(name_servVerify.value != ""){
		name_serv.style.border = '1px solid #bfbfbf';
		error_name_serv.innerHTML = "";
		return true;
	}
}

function tipo_servVerify(){
	if(tipo_servVerify.value != ""){
		tipo_serv.style.border = '1px solid #bfbfbf';
		error_tipo_serv.innerHTML = "";
		return true;
	}
}

function desc_servVerify(){
	if(desc_servVerify.value != ""){
		desc_serv.style.border = '1px solid #bfbfbf';
		error_desc_serv.innerHTML = "";
		return true;
	}
}

function origin_servVerify(){
	if(origin_servVerify.value != ""){
		origin_serv.style.border = '1px solid #bfbfbf';
		error_origin_serv.innerHTML = "";
		return true;
	}
}

