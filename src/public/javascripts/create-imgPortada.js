var publicacion = document.forms['formu']['publicacion']

var error_publicacion = document.getElementById('error_publicacion')

publicacion.addEventListener('blur', publicacionVerify, true)


function Validate(){
	if(publicacion.value == ''){
		publicacion.style.border = '1px solid #ff4d4d'
		error_publicacion.textContent = 'Escriba un comentario';
		return false;
	}
}

function publicacionVerify(){
	if(publicacionVerify.value != ""){
		publicacion.style.border = '1px solid #e6e6e6';
		error_publicacion.innerHTML = "";
		return true;
	}
}