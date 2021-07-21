

var URLactual = window.location;

if(URLactual == 'http://localhost:8080/Dintair'){
	document.getElementById('homeimg').src='/images/icons/world_footer_focus.png'
}
if(URLactual == 'http://localhost:8080/Dintair/recommendations/board'){
	document.getElementById('clientes').src='/images/icons/compass_footer_focus.png'
}
if(URLactual == 'http://localhost:8080/Dintair/kindProduct'){
	document.getElementById('productos').src='/images/icons/productos_footer_focus.png'
}

if(URLactual == 'http://localhost:8080/Dintair/profile/user'){
	document.getElementById('perfil').src='/images/icons/profile_footer_focus.png'
}


