document.getElementById('btn_delete_add').addEventListener('click', function(e){
	let response = confirm('¿Seguro que desea eliminar el producto?');
		if(!response){
			e.preventDefault();
		}
	}
)