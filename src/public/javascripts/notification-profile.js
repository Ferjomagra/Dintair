/**
 * @author Dimas Gustavo amadeusc2@gmail.com
 * @version 1.0
 */

var socket = io();

$(function() {
    var user_id_emisor = $('#userIdEmisor').val();

    var _base = {
        init : function(){
            _base.generateIdSocket();
            _base.alert();
        },
        generateIdSocket : function(){
            socket.emit('notificationProfile:setId', {user_id : user_id_emisor});
        },
        alert: function(){
            var dCurrent = {user_id:user_id_emisor};

            socket.emit('notificationProfile:setAlertCurrent', dCurrent);

            if($('.js-add-contact').length > 0){
                var data = {
                    user_id: $('.js-add-contact').attr('data-contact-id'),
                    user_id_emisor: user_id_emisor,
                    alert:0
                }

                socket.emit('notificationProfile:setAlert', data);
            }

            socket.on('notificationProfile:getAlert', function(data){
                $('#nhp').find('#not').text(data.alert).css('background','red');
            });
            socket.on('notificationProfile:getAlert', function(data){
                $('#nhph').find('#not').text(data.alert).css('background','red');
            });
        }
    };

    _base.init();
});