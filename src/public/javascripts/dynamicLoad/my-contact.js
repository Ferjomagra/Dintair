/**
 * @author Dimas Gustavo amadeusc2@gmail.com
 * @version 1.0
 */

$(function() {
    var _base = {
        init : function(){
            _base.addContact();
        },
        addContact: function(){
            $('.js-add-contact').on('click', function(){
                var obj = $(this);

                var dataString = 'user_contact_id=' + $(this).attr('data-contact-id');
                var action = $(this).attr('data-url');

                $.ajax({
                    type: "POST",
                    url: action,
                    data: dataString,
                    dataType: 'json',
                    success: function(result) {
                        if(result.state == 1){
                            if(result.data.behavior == 'delete'){
                                obj.find('span').text('Me interesa');
                            }

                            if(result.data.behavior == 'add'){
                                obj.find('span').text('Dejar de interesar');
                            }
                        }
                    },
                    error: function(r) {
                        console.log("algo esta mal!");
                    }
                });

                return false;
            });
        },
    };

    _base.init();
});