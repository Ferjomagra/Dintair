var nameAmb = document.forms['formuAmb']['nameAmb']
var dia_1 = document.forms['formuAmb']['dia_1']
var mes_1 = document.forms['formuAmb']['mes_1']
var año_1 = document.forms['formuAmb']['año_1']
var country_Amb = document.forms['formuAmb']['country_Amb']
var cargoAmb = document.forms['formuAmb']['cargoAmb']
var funcionAmb = document.forms['formuAmb']['funcionAmb']
var numAmb = document.forms['formuAmb']['numAmb']
var emailAmb = document.forms['formuAmb']['emailAmb']

//Definiendo los errores
var error_nameAmb = document.getElementById('error_nameAmb')
var error_dia_1 = document.getElementById('error_dia_1')
var error_mes_1 = document.getElementById('error_mes_1')
var error_año_1 = document.getElementById('error_año_1')
var error_country_Amb = document.getElementById('error_country_Amb')
var error_cargoAmb = document.getElementById('error_cargoAmb')
var error_funcionAmb = document.getElementById('error_funcionAmb')
var error_numAmb = document.getElementById('error_numAmb')
var error_emailAmb = document.getElementById('error_emailAmb')


nameAmb.addEventListener('blur', nameAmbVerify, true);
dia_1.addEventListener('blur', dia_1Verify, true);
mes_1.addEventListener('blur', mes_1Verify, true);
año_1.addEventListener('blur', año_1Verify, true);
country_Amb.addEventListener('blur', country_AmbVerify, true);
cargoAmb.addEventListener('blur', cargoAmbVerify, true);
emailAmb.addEventListener('blur', emailAmbVerify, true);
funcionAmb.addEventListener('blur', funcionAmbVerify, true);
numAmb.addEventListener('blur', numAmbVerify, true);






function Validate(){
	if(nameAmb.value == ""){
		nameAmb.style.border = '1px solid #ff4d4d';
		return false;
	}
	if(dia_1.value == null || dia_1.value == 0){
		dia_1.style.border = '1px solid #ff4d4d';
		return false;
	}
	if(mes_1.value == null || mes_1.value == 0){
		mes_1.style.border = '1px solid #ff4d4d';
		return false;
	}
	if(año_1.value == null || año_1.value == 0){
		año_1.style.border = '1px solid #ff4d4d';
		return false;
	}

	if(country_Amb.value == null || country_Amb.value == 0){
		country_Amb.style.border = '1px solid #ff4d4d';
		return false;
	}

	if(cargoAmb.value == ""){
		cargoAmb.style.border = '1px solid #ff4d4d';
		return false;
	}

	if(funcionAmb.value == ""){
		funcionAmb.style.border = '1px solid #ff4d4d';
		return false;
	}

	if( isNaN(parseInt(numAmb.value)) ){
		numAmb.style.border = '1px solid #ff4d4d';
		return false;
	}

	if( !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(emailAmb.value)) ){
		emailAmb.style.border = '1px solid #ff4d4d';
		return false;
	}


	/*if( !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(emailAmb.value)) ){
		emailAmb.style.border = '1px solid #ff4d4d';
		return false;
	}*/


}


function nameAmbVerify(){
	if(nameAmbVerify.value != ""){
		nameAmb.style.border = '1px solid #bfbfbf';
		return true;
	}
}
function dia_1Verify(){
	if(dia_1Verify.value != ""){
		dia_1.style.border = '1px solid #bfbfbf';
		return true;
	}
}
function mes_1Verify(){
	if(mes_1Verify.value != ""){
		mes_1.style.border = '1px solid #bfbfbf';
		return true;
	}
}
function año_1Verify(){
	if(año_1Verify.value != ""){
		año_1.style.border = '1px solid #bfbfbf';
		return true;
	}
}
function country_AmbVerify(){
	if(country_AmbVerify.value != ""){
		country_Amb.style.border = '1px solid #bfbfbf';
		return true;
	}
}

function cargoAmbVerify(){
	if(cargoAmbVerify.value != ""){
		cargoAmb.style.border = '1px solid #bfbfbf';
		return true;
	}
}

function funcionAmbVerify(){
	if(funcionAmbVerify.value != ""){
		funcionAmb.style.border = '1px solid #bfbfbf';
		return true;
	}
}

function numAmbVerify(){
	if( isNaN(numAmbVerify.value) ){
		numAmb.style.border = '1px solid #bfbfbf';
		return true;
	}
}


function emailAmbVerify(){
	if((/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(emailAmb.value))){
		emailAmb.style.border = '1px solid #cccccc';
		return true;
	}
}

/*function emailAmbVerify(){
	if( (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(emailAmb.value))){
		emailAmb.style.border = '1px solid "bfbfbf';
		return true;
	}
}*/



