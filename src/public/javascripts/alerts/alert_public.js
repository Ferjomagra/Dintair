document.getElementById('btn_ocultar').addEventListener('click', function(e){
	let response = confirm('¿Seguro que desea eliminar la publicación?');
		if(!response){
			e.preventDefault();
		}
	}
)