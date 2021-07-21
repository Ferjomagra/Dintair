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
            $('#txtSearchHeader').on('keyup', function(){
                var search = $.trim($(this).val());

                if(search.length >= 1) {
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
                                        

                                        switch(type) {
                                            case 'product':
                                                var fileimg = item.imgProductos.split('---')
                                                html += '<article>';
                                                html += '<a href="/Dintair/products/'+item._id+'">';
                                                html += '<div class="coverprofile", style="background-image: url('+fileimg[0]+')"></div>';
                                                //html += '<img src="' + item.imgProductos + '">';
                                                html += '<p style="font-size:13px;letter-spacing:1px;color:#737373;">' + item.nombre + '</p>';
                                                html += '</a>';
                                                html += '</article>';

                                                break;
                                            case 'business':
                                                html += '<article>';
                                                html += '<a href="/Dintair">';
                                                html += '<div class="coverprofile", style="background-image: url('+item.imageProfile+')"></div>';
                                                html += '<p>' + item.comp_name + '</p>';
                                                html += '</a>';
                                                html += '</article>';

                                                break;
                                            default:
                                            // code block
                                        }

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
                    $('#content-search-header').html('');
                }
            });
        }

    };

    _base.init();
})