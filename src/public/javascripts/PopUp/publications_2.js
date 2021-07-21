/**
 * @author Dimas Gustavo amadeusc2@gmail.com
 * @version 1.0 
 */
$(function() {
    var _base = {
        init : function(){
            _base.popup();
        },
        popup: function () {

            $('.seconditem p').on('click', function(){
                $('#sectionResult_2').show();
       

                var id = $(this).closest('.seconditem').find('.one_image').attr('data-list-id');
       
                var dataString = 'id=' + id;
                console.log(id)
                console.log(dataString)

                $('#result_2').html('')

                var html = '<div>';
                        html += '<img style="width:100%" src='+id+'>';
                    html += '</div>';

                $('#result_2').append(html);


            });
        },
    };
        
    _base.init();
});

