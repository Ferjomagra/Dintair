document.getElementById('btn_deletePass_2').addEventListener('click', function(e){
	let response = confirm('¿Esta seguro que quiere cerrar su cuenta?');
		if(!response){
			e.preventDefault();
		}
	}
)