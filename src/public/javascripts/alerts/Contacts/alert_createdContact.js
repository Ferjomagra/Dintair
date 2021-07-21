document.getElementById('btn_createdContact').addEventListener('click', function(e){
	let response = confirm('¿Seguro que desea eliminar este contacto?');
		if(!response){
			e.preventDefault();
		}
	}
)