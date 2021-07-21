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
		$(_error).text(txt).show();
		$(obj).css('border', '1px solid #ff4d4d');

		_state = 1;
	} else {
		$(obj).css('border', '1px solid #ccc');
		$(_error).hide();

		_state = 0;
	}

	//correo
	if(type=='email'){
		if(!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(_item))){
			$(_error).text(txt).show();
			$(obj).css('border', '1px solid #ff4d4d');

			_state = 1;
		} else {
			$(obj).css('border', '1px solid #ccc');
			$(_error).hide();

			_state = 0;
		}
	}

	//numero
	if(type=='number'){
		if(!(/^\d{9}$/.test(_item))){
			$(_error).text(txt).show();
			$(obj).css('border', '1px solid #ff4d4d');

			_state = 1;
		} else {
			$(obj).css('border', '1px solid #ccc');
			$(_error).hide();

			_state = 0;
		}
	}

	//select
	if(type=='select'){
		if(_item == ""){
			$(_error).text(txt).show();
			$(obj).css('border', '1px solid #ff4d4d');

			_state = 1;
		} else {
			$(obj).css('border', '1px solid #ccc');
			$(_error).hide();

			_state = 0;
		}
	}

	return _state;
}

$(".next").click(function(){
	var state = 0;
	if(_section == 1){
		state += _msg('#full_name', 'Escriba su nombre y apellido', 'text');
		state += _msg('#comp_name', 'Escriba el nombre de su negocio o empresa', 'text');
		state += _msg('#username', 'Escriba un correo válido', 'email');
		state += _msg('#password', 'Escriba una contraseña', 'text');
	}
	if(_section == 2){
		state += _msg('#wtpnumber', 'Escriba un número de contacto', 'number');
		state += _msg('#rubrotarget', 'Seleccione un rubro', 'select');
		state += _msg('#editable-select1', 'Seleccione su país', 'select');
		state += _msg('#editable-select2', 'Seleccione su provincia', 'select');
	}



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


$('#btnSend').on('click', function(){
    var state = 0;
    if(_section == 2)

    var action = $('#msform').attr('action');
    dataString += '&full_name' + $.trim($('#full_name').val());
    dataString += '&comp_name' + $.trim($('#comp_name').val());
    dataString += '&username' + $.trim($('#username').val());
    dataString += '&password' + $.trim($('#password').val());
    dataString += '&wtpnumber' + $.trim($('#wtpnumber').val());
    dataString += '&rubroTarget' + $.trim($('#rubroTarget').val());
    dataString += '&editable-select1' + $.trim($('#editable-select1').val());
    dataString += '&editable-select2' + $.trim($('#editable-select2').val());


    $('#loaderImg').css('display', 'block');
    $('#btnSend').attr('disabled', true);

    $.ajax({
        type: "POST",
        url: action,
        data: dataString,
        dataType: 'json',
        success: function(result) {
            if(result.state == 1){
                console.log(result.msg);
                window.location.href = result.data.url;
            }else{
                console.log(result.msg);
            }
        }
    });

    return false;
});