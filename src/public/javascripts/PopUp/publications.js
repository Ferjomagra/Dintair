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

            $('.firstitem p').on('click', function(){
                $('#sectionResult').show();
       

                var id = $(this).closest('.firstitem').find('.one_image').attr('data-list-id');
       
                var dataString = 'id=' + id;
                console.log(id)
                console.log(dataString)

                $('#result').html('')

                var html = '<div>';
                        html += '<img style="width:100%" src='+id+'>';
                    html += '</div>';

                $('#result').append(html);


            });
        },
    };
        
    _base.init();
});