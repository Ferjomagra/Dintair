$(document).ready(function(){
	var choose_field = $('#selectSearch'),
		dyntext = $('#txtSearchHeader');

	choose_field.on('change', function(){
		dyntext.attr('placeholder','Busca '+choose_field.find(':selected').text())
	})


	var choose_field2 = $('#selectSearch2'),
		dyntext2 = $('#txtSearchHeader_2');

	choose_field2.on('change', function(){
		dyntext2.attr('placeholder','Busca '+choose_field2.find(':selected').text())
	})
})