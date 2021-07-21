$(document).ready(function(){
	//PARA BORDE DEL BLOQUE1
	$('.sectionDrag').on('dragover', function(){
		$(this).addClass('sectionDrag_over');
	});
	$('.sectionDrag').on('dragleave', function(){
		$(this).removeClass('sectionDrag_over');
		return false;
	})
	//FIN DEL BLOQUE1

});