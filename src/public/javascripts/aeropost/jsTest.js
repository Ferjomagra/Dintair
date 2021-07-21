$(document).ready(function(){
  $.ajaxSetup({ cache: false });
  $('#search').keyup(function(){
    $('#result').html('');
    $('#state').val('');
    var searchField = $('#search').val();
    var expression = new RegExp(searchField, "i");

    if(searchField){
      $.getJSON('../data/data.json', function(data) {
        $.each(data, function(key, value){
          if (value.Producto.search(expression) != -1 || value.Estado.search(expression) != -1){
            if(value.Estado == "Producto prohibido"){
              $('#result').append(
                '<div style="margin:auto; width:80%; margin-bottom:15px; border-radius:5px; border:1px solid #f2f2f2; box-shadow: 0px 2px 10px rgba(0,0,0,0.3);">'+
                  '<div class="list-group link-class"; style="margin-bottom:0px;">'+
                    '<div style="background:#f2f2f2; padding:10px;">'+
                      
                      '<p style="font-weight:bold; color:#737373; font-size:15px; margin:0 0 0px; padding:0 0 0px; margin-bottom: 10px;">'+ value.Producto +'</p>'+
                      '<h3 class="text-muted" style="color:white; margin:0 0 0px; padding:0 0 0px; background:#ff3333; padding:8px; font-size:14px; border-radius:3px; width: 100%; max-width:170px; text-align:center;">'+value.Estado+'</h3>'+
                    '</div>'+
                  '</div>'+

                 '<div style="background:#f2f2f2; padding:10px;">'+
                    '<p style="font-weight:bold; color:#737373; font-size:12px; margin:0 0 0px; padding:0 0 0px;">Para más información haga clic'+
                      '<a href="'+value.Link+'"; target="_blank"> aquí</a>'+
                    '</p>'+
                  '</div>'+

                '</div>'
              );
            };
            if(value.Estado == "Sin restricciones"){
              $('#result').append(
                '<div style="margin:auto; width:80%; margin-bottom:15px; border-radius:5px; border:1px solid #f2f2f2; box-shadow: 0px 2px 10px rgba(0,0,0,0.3);">'+
                  '<div class="list-group link-class"; style="margin-bottom:0px;">'+
                    '<div style="background:#f2f2f2; padding:10px;">'+
                      
                      '<p style="font-weight:bold; color:#737373; font-size:15px; margin:0 0 0px; padding:0 0 0px; margin-bottom: 10px;">'+ value.Producto +'</p>'+
                      '<h3 class="text-muted" style="color:white; margin:0 0 0px; padding:0 0 0px; background:#00cc88; padding:8px; font-size:14px; border-radius:3px; width: 100%; max-width:170px; text-align:center;">'+value.Estado+'</h3>'+
                    '</div>'+
                  '</div>'+

                  '<div style="margin-bottom:0px;padding:10px; background:white;">'+
                    '<p style="color:#737373; font-size:15px;margin:0 0 0px; padding:0 0 0px;margin-bottom:5px;">Comentario:</p>'+
                    '<p style="color:#00cc88; font-size:15px;margin:0 0 0px; padding:0 0 0px;">'+ value.Comentario+'</p>'+
                  '</div>'+

                  '<div style="background:#f2f2f2; padding:10px;">'+
                    '<p style="font-weight:bold; color:#737373; font-size:12px; margin:0 0 0px; padding:0 0 0px;">Para más información haga clic'+
                      '<a href="'+value.Link+'"; target="_blank"> aquí</a>'+
                    '</p>'+
                  '</div>'+

                '</div>'
              );
            };
            if(value.Estado == "Producto restringido"){
              $('#result').append(
                '<div style="margin:auto; width:80%; margin-bottom:15px; border-radius:5px; border:1px solid #f2f2f2; box-shadow: 0px 2px 10px rgba(0,0,0,0.3);">'+
                  '<div class="list-group link-class"; style="margin-bottom:0px;">'+
                    '<div style="background:#f2f2f2; padding:10px;">'+
                      
                      '<p style="font-weight:bold; color:#737373; font-size:15px; margin:0 0 0px; padding:0 0 0px; margin-bottom: 10px;">'+ value.Producto +'</p>'+
                      '<h3 class="text-muted" style="color:white; margin:0 0 0px; padding:0 0 0px; background:orange; padding:8px; font-size:14px; border-radius:3px; width: 100%; max-width:170px; text-align:center;">'+value.Estado+'</h3>'+
                    '</div>'+
                  '</div>'+

                  '<div style="margin-bottom:0px;padding:10px; background:white;">'+
                    '<p style="font-weight:bold; color:#737373; font-size:15px; margin:0 0 0px; padding:0 0 0px; margin-bottom: 10px;"> ¿Qué requiere? </p>'+
                    '<p style="color:#737373; font-size:15px;margin:0 0 0px; padding:0 0 0px; margin-bottom: 8px;"> Documentos: '+ value.Documentos+'</p>'+
                    '<p style="color:#737373; font-size:15px;margin:0 0 0px; padding:0 0 0px; margin-bottom: 8px;"> Entidad: '+ value.Entidad+'</p>'+
                    '<p style="color:#737373; font-size:15px;margin:0 0 0px; padding:0 0 0px; margin-bottom: 8px;"> Subpartida nacional: '+ value.Subpartida_nacional+'</p>'+

                    '<p style="color:#737373; font-size:15px;margin:0 0 0px; padding:0 0 0px;margin-bottom:5px;">Comentario:</p>'+
                    '<p style="color:#00cc88; font-size:15px; margin:0 0 0px; padding:0 0 0px;">'+value.Comentario+'</p>'+
                  '</div>'+

                  '<div style="background:#f2f2f2; padding:10px;">'+
                    '<p style="font-weight:bold; color:#737373; font-size:12px; margin:0 0 0px; padding:0 0 0px;">Para más información haga clic'+
                      '<a href="'+value.Link+'"; target="_blank"> aquí</a>'+
                    '</p>'+
                  '</div>'+

                '</div>'
              );
            };
          }
        });
        
      });
    } else {
      $('#result').append('');
    }
  });
 
  $('#result').on('click', 'li', function() {
    var click_text = $(this).text().split('|');
    $('#search').val($.trim(click_text[0]));
    $("#result").html('');
  });
});

