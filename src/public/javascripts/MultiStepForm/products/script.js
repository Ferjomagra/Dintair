var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

var _section = 1;

function _msg(obj, txt, type) {
	var _item = $.trim($(obj).val());
	var _state = 0;
	var _error = '#' + $(obj).attr('data-error-id');

	// si tiene valor o no
	if(!_item){
		$(_error).show();
		$(_error).text(txt);
		$(obj).css('border', '1px solid #ff4d4d');

		_state = 1;
	} else {
		$(obj).css('border', '1px solid #ccc');
		$(_error).hide();

		_state = 0;
	}

	// si es numerico o no	
	if(type == 'number'){
		if(parseInt(_item) > 0) {
			$(obj).css('border', '1px solid #ccc');
			$(_error).hide();

			_state = 0;
		} else {
			$(_error).show();
			$(_error).text(txt);
			$(obj).css('border', '1px solid #ff4d4d');

			_state = 1;
		}
	}

	return _state;
}

$(".next").click(function(){
	var state = 0;
	if(_section == 1){
		state += _msg('#editable-select', 'Selecciona uno de los rubros', 'text');
	}

	if(_section == 2) {
		state += _msg('#nombre', 'Escribe el nombre de tu producto', 'text');
		state += _msg('#descripcion', 'Agrega una descripción de tu producto', 'text');
		state += _msg('#procedencia', 'Agrega el lugar de procedencia', 'text');
	}

	/*if(_section == 3) {
		state += _msg('#stock', 'Escribe el stock total disponible', 'number');
		state += _msg('#tipo_unidades', 'Escribe la unidad de entrega. Ejemplo: Unidades, sacos, toneladas.', 'text');
	}*/





	if(state > 0){
		return false;
	}

	_section += 1;
	

	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show();

	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 

		duration: 600, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
	

});

$(".previous").click(function(){
	_section -= 1;

	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 600, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});