var searchings = document.forms['formu']['searching'];
var rubroTarget = document.forms['formu']['rubroTarget']

searchings.addEventListener('blur', searchVerify, true);
rubroTarget.addEventListener('blur', rubroTargetVerify, true);



function Validate(){
	if( searchings.value == ""){
		searchings.style.border = '1px solid #d9d9d9';
		return false;
	}
	if(rubroTarget.value == null || rubroTarget.value == 0){
		rubroTarget.style.border = '1px solid #d9d9d9';
		return false;
	}
}

function searchVerify(){
	if(searchVerify.value != ""){
		searchings.style.border = '1px solid #d9d9d9';
		return true;
	}
}
function rubroTargetVerify(){
	if(rubroTarget.value != ""){
		rubroTarget.style.border = '1px solid #d9d9d9';
		return true;
	}
}