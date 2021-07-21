/**
 * @author Dimas Gustavo amadeusc2@gmail.com
 * @version 1.0
 */
$(function() {

    var _base = {
      init : function(){
          _base.search();
      },
      search :  function() {
          

        $('#search').on('keyup', function(){
          var search = $.trim($(this).val());
            if(search.length > 0) {
                $('#SearchHeaderNotice').hide();
                $('#content-search-header').show();
                

                var action = $(this).attr('data-source');
                var type = $('#selectSearch').val();
                var dataString = 'search=' + search + '&type=' + type ;
                

                $.ajax({
                  type: "POST",
                  url: action,
                  data: dataString,
                  dataType: 'json',
                  success: function(result){
                    console.log(result);

                    if(result.state == 1){
                        var data = result.data;
                        console.log(data)

                        $('#content-search-header').html('');

                        if(data.length){
                            data.map(function(item){
                              
                              var html = '';
                              
                              html += '<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 globo">'
                                html += '<div class="product_results">'
                                  
                                  html += '<div class="example_pic" style="background-image: url('+item.imgProductos+');">'
                                    
                                      if(item.iam == "Prohibido"){
                                        html += '<div class="info" style="width:100%;">'
                                          html += '<div class="text2" style="width:100%;">'
                                            html += '<a href="/Dintair/product/'+item._id+'">'
                                              html += '<button style="color:#ff0000; background:white;">Ver más'
                                                html += '<img class="right_arrow" src="/images/iconos/red_arrow.png">'
                                              html += '</button>'
                                            html += '</a>'
                                          html += '</div>'
                                        html += '</div>'
                                    
                                      } else if(item.iam == "Restringido"){
                                        html += '<div class="info" style="width:100%;">'
                                          html += '<div class="text2" style="width:100%;">'
                                            html += '<a href="/Dintair/product/'+item._id+'">'
                                              html += '<button style="color:#ff5500; background:white;">Ver más'
                                                html += '<img class="right_arrow" src="/images/iconos/orange_arrow.png">'
                                              html += '</button>'
                                            html += '</a>'
                                          html += '</div>'
                                        html += '</div>'

                                      } else if(item.iam == "Sin restricción"){
                                        html += '<div class="info">'
                                        
                                          html += '<div class="text2" style="width:100%;">'
                                            html += '<a href="/Dintair/product/'+item._id+'">'
                                              html += '<button style="color:#00cc7a; background:white;">Ver más'
                                                html += '<img class="right_arrow" src="/images/iconos/green_arrow.png">'
                                              html += '</button>'
                                            html += '</a>'
                                          html += '</div>'
                                          

                                        html += '</div>'
                                      }
                                      
                                  html += '</div>'

                                  
                                  

                                  if(item.iam == "Prohibido"){
                                    html += '<div class="deep_box" style="background:rgba(255, 77, 77, 0.1);">'
                                      html += '<h3 class="text-muted pro" style="font-weight: bold; color:#ff0000; background:rgba(255, 77, 77, 0.1); letter-spacing: 0.03rem; margin:0 0 0px; padding:0 0 0px;padding:8px; font-size:13px; border-radius:3px; width: 100%;text-align:center;">Producto '+item.iam+'</h3>'
                                      html += '<p class="nombre" title="'+item.nombre+'">'+item.nombre+'</p>'
                                    html += '</div>'
                                  }
                                  if(item.iam == "Restringido"){
                                    html += '<div class="deep_box" style="background:rgba(255, 166, 77, 0.1);">'
                                      html += '<h3 class="text-muted rest" style="font-weight: bold; color:#ff5500; background:rgba(255, 166, 77, 0.1); letter-spacing: 0.03rem; margin:0 0 0px; padding:0 0 0px;padding:8px; font-size:13px; border-radius:3px; width: 100%;text-align:center;">Producto '+item.iam+'</h3>'
                                      html += '<p class="nombre" title="'+item.nombre+'">'+item.nombre+'</p>'
                                    html += '</div>'
                                  }
                                  if(item.iam == "Sin restricción"){
                                    html += '<div class="deep_box" style="background:rgba(113,213,172,0.1);">'
                                      html += '<h3 class="text-muted sinrest" style="font-weight: bold; color:#00cc7a; background:rgba(113,213,172,0.1); letter-spacing: 0.03rem; margin:0 0 0px; padding:0 0 0px;padding:8px; font-size:13px; border-radius:3px; width: 100%;text-align:center;">Producto '+item.iam+'</h3>'
                                      html += '<p class="nombre" title="'+item.nombre+'">'+item.nombre+'</p>'
                                    html += '</div>'
                                  }
                                    
                            
                                  html += '<div class="font">'
                                    html += '<p class="text_font">Fuente de información,' 
                                      html += '<a href="'+item.link+'"; target="_blank"> aquí</a>'
                                    html += '</p>'
                                  html += '</div>'
                                html += '</div>'
                              html +=  '</div>'
                              

                                  
                                
                            $('#content-search-header').append(html);
                            

                          });

                        }
                    }else{
                        console.log('no se pudo redirigir');
                    }
                  }
                });
            } else {
                console.log('Es menor a 3');
                $('#content-search-header').hide();
            }
          
        });
      }
    };

    _base.init();
})