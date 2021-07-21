document.getElementById('btn_editContact').addEventListener('click', function(e){
	let response = confirm('¿Seguro que desea editar este contacto?');
		if(!response){
			e.preventDefault();
		}
	}
)