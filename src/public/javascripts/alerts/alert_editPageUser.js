document.getElementById('btn_editPageUser').addEventListener('click', function(e){
	let response = confirm('¿Seguro que desea guardar los cambios?');
		if(!response){
			e.preventDefault();
		}
	}
)