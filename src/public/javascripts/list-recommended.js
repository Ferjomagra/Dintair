/**
 * @author Dimas Gustavo amadeusc2@gmail.com
 * @version 1.0
 */

$(function() {
    var _base = {
        init : function(){
            _base.recommended();
        },
        recommended: function(){
            $('.js-publication').on('click', function(e){
                e.preventDefault();

                var list = [];
                var aindex = 0;

                var checkbox = $('#result input[type=checkbox]');

                checkbox.each(function (index, item) {
                    if(item.checked){
                        list[aindex] = item.attributes['data-id'].value;

                        aindex++;
                    }
                });

                var action = $(this).attr('data-url-prev');
                var dataString = 'list=' + JSON.stringify(list);

                $.ajax({
                    type: "POST",
                    url: action,
                    data: dataString,
                    dataType: 'json',
                    success: function(result) {
                        if(result.state == 1){                            
                            //window.location.href = result.data.url;                            
                            window.location.href = '/Dintair/create/publication';
                        }else{
                            console.log(result);
                        }
                    }
                });


                return false;
            });
        }
    };

    _base.init();
});