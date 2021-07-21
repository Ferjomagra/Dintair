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
                    var dataString = 'search=' + search;

                    $.ajax({
                        type: "POST",
                        url: action,
                        data: dataString,
                        dataType: 'json',
                        success: function(result) {
                            console.log(result);

                            if(result.state == 1){
                                var data = result.data;

                                $('#content-search-header').html('');

								if(data.length){
                                    data.map(function(item){
                                        /*
                                        //producto
                                        var html = '<article>';
                                        html += '<a href="">';
                                        html += '<img src="' + item.imgProductos + '">';
                                        html += '<p>' + item.nombre + '</p>';
                                        html += '</a>';
                                        html += '</article>';
                                        */

                                        //clientes
                                        var html = '<article>';
                                        html += '<a href="">';
                                        html += '<div class="coverprofile", style="background-image: url('+item.imageProfile+')"></div>';
                                        //html += '<img src="' + item.imageProfile + '">';
                                        html += '<p>' + item.comp_name + '</p>';
                                        html += '</a>';
                                        html += '</article>';

                                        $('#content-search-header').append(html);
									});
								}
                            }else{
                                console.log('no se pudo pudo redireguir');
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
});