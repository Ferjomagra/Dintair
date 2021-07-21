document.getElementById('btn_deletecontact').addEventListener('click', function(e){
	let response = confirm('¿Seguro que desea eliminar este contacto?');
		if(!response){
			e.preventDefault();
		}
	}
)