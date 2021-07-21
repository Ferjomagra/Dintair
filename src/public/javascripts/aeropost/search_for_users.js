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

                if(search.length >= 1) {
                    $('#SearchHeaderNotice').hide();
                    $('#content-aeropost').show();

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

                                $('#content-aeropost').html('');

                                if(data.length){
                                    data.map(function(item){
                                        var html = '';

                                        html += '<div style="margin:auto; width:80%; margin-bottom:15px; border-radius:5px; border:1px solid #f2f2f2; box-shadow: 0px 2px 10px rgba(0,0,0,0.3);">'
                                        html += '<div class="list-group link-class"; style="margin-bottom:0px;">'
                                        html += '<div style="background:#f2f2f2; padding:10px;">'
                                              
                                        html += '<p style="font-weight:bold; color:#737373; font-size:15px; margin:0 0 0px; padding:0 0 0px; margin-bottom: 10px;">'+ item.nombre +'</p>'
                                        if(item.imgProductos != "/images/img_defectproducts_none-01.jpg"){
                                          html += '<img style="width: 100%;max-width:250px;margin-bottom:10px;" src='+item.imgProductos+'>'
                                        }
                                                                               
                                        if(item.iam == "Prohibido"){
                                        html += '<h3 class="text-muted" style="color:white; margin:0 0 0px; padding:0 0 0px; background:#ff4d4d; padding:8px; font-size:14px; border-radius:3px; width: 100%; max-width:170px; text-align:center;">'+item.iam+'</h3>'
                                        }
                                        if(item.iam == "Restringido"){
                                          html += '<h3 class="text-muted" style="color:white; margin:0 0 0px; padding:0 0 0px; background:orange; padding:8px; font-size:14px; border-radius:3px; width: 100%; max-width:170px; text-align:center;">'+item.iam+'</h3>'
                                        }
                                        if(item.iam == "Sin restricción"){
                                          html += '<h3 class="text-muted" style="color:white; margin:0 0 0px; padding:0 0 0px; background:#00cc88; padding:8px; font-size:14px; border-radius:3px; width: 100%; max-width:170px; text-align:center;">'+item.iam+'</h3>'
                                        }
                                        
                                        html += '</div>'
                                        html += '</div>'

                                        html += '<div style="margin-bottom:0px;padding:10px; background:white;">'
                                        

                                        if(item.documents != ""){
                                          html += '<p style="font-weight:bold; color:#737373; font-size:15px; margin:0 0 0px; padding:0 0 0px; margin-bottom: 10px;"> ¿Qué requiere? </p>'
                                          html += '<p style="color:#737373; font-size:15px;margin:0 0 0px; padding:0 0 0px; margin-bottom: 8px;"> Documentos: '+ item.documents+'</p>'
                                        } else if (item.documents == ""){
                                          
                                        }                     

                                        if(item.entidad != ""){
                                          html += '<p style="color:#737373; font-size:15px;margin:0 0 0px; padding:0 0 0px; margin-bottom: 8px;"> Entidad: '+ item.entidad+'</p>'
                                        } else if(item.entidad == ""){

                                        }
                                        
                                        if(item.subpartida != ""){
                                          html += '<p style="color:#737373; font-size:15px;margin:0 0 0px; padding:0 0 0px; margin-bottom: 8px;"> Subpartida nacional: '+ item.subpartida+'</p>'
                                        }else if(item.subpartida == ""){

                                        }
                                        
                                        if(item.iam == "Prohibido"){
                                            if(item.comentario != ""){
                                              html += '<p style="color:#737373; font-size:15px;margin:0 0 0px; padding:0 0 0px;margin-bottom:5px;">Comentario:</p>'
                                              html += '<p style="color:#ff4d4d; font-size:15px; margin:0 0 0px; padding:0 0 0px;">'+item.comentario+'</p>'
                                            }
                                        } else if(item.iam != "Prohibido"){
                                            if(item.comentario != ""){
                                                html += '<p style="color:#737373; font-size:15px;margin:0 0 0px; padding:0 0 0px;margin-bottom:5px;">Comentario:</p>'
                                                html += '<p style="color:#00cc88; font-size:15px; margin:0 0 0px; padding:0 0 0px;">'+item.comentario+'</p>'
                                            }
                                        }



                                        if(item.iam != "Prohibido"){
                                            if(item.aeropost_link == ""){
                                               
                                            } else if(item.aeropost_link == undefined){

                                            } else{
                                                html += '<div style="display: flex; background:#8fc7e8; margin-top: 5px; padding:5px; width: 100%; max-width: 260px; border-radius:5px;">'
                                                html += '<a href="'+item.aeropost_link+'"; target=_blank; style="text-decoration: none;">'
                                                html += '<button style="background: white; display:block; border-radius:5px; width:150px; padding:8px;border:0px; color:#002d93;text-decoration: none;">Encuentralo en</button>'
                                                html += '</a>'
                                                html += '<div class=aeropost-btn; style="">'
                                                html += '<a href="'+item.aeropost_link+'"; target=_blank; style="text-decoration: none;">'
                                                html += '<img src="/images/iconos/aero.jpg", style="width:95px;margin-left:4px;vertical-align:-18.5px;">'
                                                html += '</a>'
                                                html += '</div>'
                                                html += '</div>'
                                            }
                                        } else if(item.iam == "Prohibido"){
                                            
                                        }
                                        

                                        
                                        html += '</div>'

                                        html +=  '<div style="background:#f2f2f2; padding:10px;">'
                                        html +=  '<p style="font-weight:bold; color:#737373; font-size:12px; margin:0 0 0px; padding:0 0 0px;">Para más información haga clic'
                                        html +=  '<a href="'+item.link+'"; target="_blank"> aquí</a>'
                                        html +=  '</p>'

                                        html +=  '<p class="id", name="id", id="id" style="display:none;">'+item._id+'</p>'

                                        html +=  '<a href="/Dintair/restricted/'+item._id+'">'
                                        html +=  '<button style="width:100%; margin-top:10px; color:white; background:#00cc88;padding:8px; border-radius:4px; border:0px"> Editar </button>'
                                        html +=  '</a>'

                                        html +=  '</div>'

                                        

                                        

                                        $('#content-aeropost').append(html);
                                    });

                                }
                            }else{
                                console.log('no se pudo redirigir');
                            }
                        }
                    });
                } else {
                    console.log('Es menor a 3');
                    $('#content-aeropost').html('');
                }
            });
        }

    };

    _base.init();
})