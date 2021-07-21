document.getElementById('btn_deletePass_1').addEventListener('click', function(e){
	let response = confirm('¿Seguro que desea continuar con el proceso de cerrar su cuenta?');
		if(!response){
			e.preventDefault();
		}
	}
)