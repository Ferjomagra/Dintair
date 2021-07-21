jQuery(document).ready(function($) {
	
	$('#buttonstart').click(function() {
		
		let idioma = $('#sel1').val()
			$(location).attr('href', idioma)

	});
});

/*Terminar de configurar los paises*/