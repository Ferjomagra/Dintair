var text_suggest = document.forms['formu']['text_suggest'];
var comp_name = document.forms['formu']['comp_name'];


var error_text_suggest = document.getElementById('error_text_suggest');
var error_comp_name = document.getElementById('error_comp_name');


text_suggest.addEventListener('blur', text_suggestVerify, true);
comp_name.addEventListener('blur', comp_nameVerify, true);


function Validate() {
	if(text_suggest.value == ''){
		text_suggest.style.border = '1px solid #ff4d4d';
		error_text_suggest.textContent = 'Escriba su mensaje';
		return false;
	}
	if(comp_name.value == ''){
		comp_name.style.border = '1px solid #ff4d4d';
		error_comp_name.textContent = 'Ingrese el nombre de su empresa';
		return false;
	}
}

function text_suggestVerify(){
	if(text_suggest.value != ''){
		text_suggest.style.border = '1px solid #d9d9d9';
		error_text_suggest.innerHTML = '';
		return true;
	}
}

function comp_nameVerify(){
	if(comp_name.value != ''){
		comp_name.style.border = '1px solid #d9d9d9';
		error_comp_name.innerHTML = '';
		return true;
	}
}