var rubroTarget = document.forms['formu']['rubroTarget'];

var error_rubroTarget = document.getElementById('error_rubroTarget');

rubroTarget.addEventListener('blur', rubroTargetVerify, true);

function Validate(){
	if(rubroTarget.value == null || rubroTarget.value == 0){
		rubroTarget.style.border = '1px solid #ff4d4d';
		error_rubroTarget.textContent = 'Seleccione su rubro';
		return false;
	}
}

function rubroTargetVerify(){
	if(rubroTarget.value != null || rubroTarget.value != 0){
		rubroTarget.style.border = '1px solid #cccccc';
		error_rubroTarget.innerHTML = "";
		return true;
	}
}