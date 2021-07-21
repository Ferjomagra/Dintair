function populate(moneda){
	var moneda = document.getElementById(moneda);

	if(moneda.value == 'Contactar al Representante'){
		var precio = document.getElementById('precio')
		var precio_min = document.getElementById('precio_min')
		var title_Pmin = document.getElementById('title_Pmin')

		precio.style.display = 'none';
		precio_min.style.display = 'none';
		title_Pmin.style.display = 'none';
		moneda.style.width = '100%';

	} else {
		var precio = document.getElementById('precio')
		var precio_min = document.getElementById('precio_min')
		var title_Pmin = document.getElementById('title_Pmin')

		precio.style.display = 'inline-block';
		precio_min.style.display = 'block';
		title_Pmin.style.display = 'block';
		moneda.style.width = '40%';
	}
}