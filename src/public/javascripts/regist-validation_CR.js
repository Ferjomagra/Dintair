var wtpnumber = document.forms['formu']['wtpnumber']
var rubroTarget = document.forms['formu']['rubroTarget'];
var country = document.forms['formu']['country'];
var provincias = document.forms['formu']['provincia'];


var error_wtpnumber = document.getElementById('error_wtpnumber')
var error_rubroTarget = document.getElementById('error_rubroTarget');
var error_country = document.getElementById('error_country');
var error_provincia = document.getElementById('error_provincia');


wtpnumber.addEventListener('blur', wtpnumberVerify, true)
rubroTarget.addEventListener('blur', rubroTargetVerify, true);
country.addEventListener('blur', countryVerify, true);
provincias.addEventListener('blur', provinciasVerify, true);


function Validate(){
	if(!(/^\d{9}$/.test(wtpnumber.value))){
		wtpnumber.style.border = '1px solid #ff4d4d';
		error_wtpnumber.textContent = 'Escriba un número válido';
		return false;
	}
	if(rubroTarget.value == ""){
		rubroTarget.style.border = '1px solid #ff4d4d';
		error_rubroTarget.textContent = 'Escriba el rubro al que se dedica';
		return false;
	}
	if(country.value == ""){
		country.style.border = '1px solid #ff4d4d';
		error_country.textContent = 'Escriba el nombre de su país de operaciones';
		return false;
	}
	if(provincias.value == ""){
		provincias.style.border = '1px solid #ff4d4d';
		error_provincia.textContent = 'Escriba su provincia';
		return false;
	}
}


function wtpnumberVerify(){
	if((/^\d{9}$/.test(wtpnumber.value))){
		wtpnumber.style.border = '1px solid #cccccc';
		error_wtpnumber.innerHTML = "";
		return true;
	}
}
function rubroTargetVerify(){
	if(rubroTargetVerify.value != ""){
		rubroTarget.style.border = '1px solid #cccccc';
		error_rubroTarget.innerHTML = "";
		return true;
	}
}
function countryVerify(){
	if(countryVerify.value != ""){
		country.style.border = '1px solid #cccccc';
		error_country.innerHTML = "";
		return true;
	}
}
function provinciasVerify(){
	if(provinciasVerify.value != ""){
		provincias.style.border = '1px solid #cccccc';
		error_provincia.innerHTML = "";
		return true;
	}
}