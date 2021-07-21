var nombre = document.forms['formu']['nombre'];
var descripcion = document.forms['formu']['descripcion']
var procedencia = document.forms['formu']['procedencia']
var stock = document.forms['formu']['stock']
var peso = document.forms['formu']['peso']
//var precio = document.forms['formu']['precio']
var moneda = document.forms['formu']['moneda']


var error_nombre = document.getElementById('error_nombre');
var error_descripcion = document.getElementById('error_descripcionP');
var error_procedencia = document.getElementById('error_procedencia');
var error_stock = document.getElementById('error_stock');
var error_peso = document.getElementById('error_peso');
//var error_precio = document.getElementById('error_precio');
var error_moneda = document.getElementById('error_moneda');


nombre.addEventListener('blur', nombreVerify, true);
descripcion.addEventListener('blur', descripcionVerify, true);
procedencia.addEventListener('blur', procedenciaVerify, true);
stock.addEventListener('blur', stockVerify, true);
peso.addEventListener('blur', pesoVerify, true);
//precio.addEventListener('blur', precioVerify, true);
moneda.addEventListener('blur', monedaVerify, true);


function Validate(){
	if( nombre.value == ""){
		nombre.style.border = '1px solid #ff4d4d';
		error_nombre.textContent = 'Ecriba el nombre de su producto';
		return false;
	}

	if( descripcion.value == ''){
		descripcion.style.border = '1px solid #ff4d4d';
		error_descripcionP.textContent = 'Agrege una descripción a su producto';
		return false;
	}

	if( procedencia.value == ""){
		procedencia.style.border = '1px solid #ff4d4d';
		error_procedencia.textContent = 'Agrege el lugar de procedencia';
		return false;
	}

	if( isNaN(parseInt(stock.value)) ){
		stock.style.border = '1px solid #ff4d4d';
		error_stock.textContent = 'Agrege el stock disponible';
		return false;
	}

	if( isNaN(parseInt(peso.value)) ){
		peso.style.border = '1px solid #ff4d4d';
		error_peso.textContent = 'Agrege el peso unitario de su producto';
		return false;
	}
	
	/*if( isNaN(parseInt(precio.value)) ){
		precio.style.border = '1px solid #ff4d4d';
		error_precio.textContent = 'Ingrese un precio';
		return false;
	}*/


}

function nombreVerify(){
	if(nombreVerify.value != ""){
		nombre.style.border = '1px solid #bfbfbf';
		error_nombre.innerHTML = "";
		return true;
	}
}

function descripcionVerify(){
	if(descripcionVerify.value != ""){
		descripcion.style.border = '1px solid #bfbfbf';
		error_descripcionP.innerHTML = "";
		return true;
	}
}

function procedenciaVerify(){
	if(procedenciaVerify.value != ""){
		procedencia.style.border = '1px solid #bfbfbf';
		error_procedencia.innerHTML = "";
		return true;
	}
}

function stockVerify(){
	if(isNaN(stockVerify.value)){
		stock.style.border = '1px solid #bfbfbf';
		error_stock.innerHTML = "";
		return true;
	}
}

function pesoVerify(){
	if(isNaN(parseInt(pesoVerify.value))){
		peso.style.border = '1px solid #bfbfbf';
		error_peso.innerHTML = "";
		return true;
	}
}

/*function precioVerify(){
	if(isNaN(parseInt(precioVerify.value))){
		precio.style.border = '1px solid #bfbfbf';
		error_precio.innerHTML = "";
		return true;
	}
}*/





