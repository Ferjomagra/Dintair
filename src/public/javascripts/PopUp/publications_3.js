$(function() {
    var _base = {
        init : function(){
            _base.popup();
        },
        popup: function () {

            $('.thirditem p').on('click', function(){
                $('#sectionResult_2').show();
       

                var id = $(this).closest('.thirditem').find('.one_image').attr('data-list-id');
       
                var dataString = 'id=' + id;
                console.log(id)
                console.log(dataString)

                $('#result_3').html('')

                var html = '<div>';
                        html += '<img style="width:100%" src='+id+'>';
                    html += '</div>';

                $('#result_3').append(html);


            });
        },
    };
        
    _base.init();
});