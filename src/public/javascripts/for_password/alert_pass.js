document.getElementById('change').addEventListener('click', function(e){
	let response = confirm('¿Seguro que desea cambiar su contraseña?');
		if(!response){
			e.preventDefault();
		}
	}
)