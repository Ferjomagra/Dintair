$(function(){

  //ESTE SCRIPT ES PARA EL FORMULARIO DE 'CREAR MI INFORMACIÓN EN OTRO IDIOMA'
  var atual_fs, next_fs1, next_fs

  $('#idioma').on('change', function(){
    var select = document.getElementById('idioma');
    console.log(select.value)


    $('.next').click(function() {

      atual_fs = $(this).parent();
      next_fs1 = $(this).parent().next();
      next_fs = $(this).parent().next().next();


      if(select.value == 'English'){
        $('#progress li').eq($('#formulario fieldset').index(next_fs1)).addClass('ativo')
        atual_fs.hide(100);
        next_fs1.show(900);
      } else {
        if(select.value == 'Chinese'){
          $('#progress li').eq($('#formulario fieldset').index(next_fs)).addClass('ativo')
          atual_fs.hide(100);
          next_fs.show(900);
        }

      
      }

    });
  })

  $('#formulario input[type=submit]').click(function() {
    return false  
  });

});