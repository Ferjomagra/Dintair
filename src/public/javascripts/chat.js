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

            //1=para uno mismo , 0 = para el receptor
            var data = {
                user_id: null,
                user_id_emisor: user_id_emisor,
                behavior : 1
            };

            _base._socket();

            if($('#content-business').length > 0){
                var userId = $.trim($('#userId').val());

                if(userId.length > 0){
                    _base.notificationUpdate(data, 'init');
                } else {
                    _base.business();
                    _base._notification(data);
                }

                _base.send();
            } else {
                _base._notification(data);
            }

            if($('#result').attr('data-url-chat')){
                _base.link();
            }
        },
        _notification: function(data){
            socket.emit('notification:get', data);
        },
        _notificationBusiness: function(data){
            socket.emit('notification:getbusiness', data);
        },
        _socket: function(){
            socket.on('chat:typing', function(data){
                var userId = $.trim($('#userId').val());

                if(data.user_id_emisor == userId){
                    $('#notificationText').show();
                    $('#notificationText').text(data.message);
                }
            });

            socket.on('notification:getbusiness', function(data){
                var content = $("#content-business .js-business");

                content.map(function(index){
                    var chatId = content.eq(index).attr('data-chat');

                    if(chatId == data.chat_id) {
                        content.eq(index).find('p').find('span').remove();

                        if(parseInt(data.alert) > 0){
                            content.eq(index).findById('alertmsg').append(' <span style="text-align: right;float: right;color : #ffffff;background: #f96464;width: 25px;height: 25px;text-align: center;line-height: 25px;border-radius: 50px;">' + data.alert + '</span>');
                        }
                    }
                });
            });

            socket.on('notification:get', function(data){
                var gAler = data.alert;

                if(gAler > 0){
                    $('#notificationHeader').show();
                    $('#notificationHeader').find('a').text(gAler);
                } else {
                    $('#notificationHeader').hide();
                }


                var gAler2 = data.alert;

                if(gAler2 > 0){
                    $('#notificationHeader2').show();
                    $('#notificationHeader2').find('p').text(gAler2);
                } else {
                    $('#notificationHeader2').show();
                    $('#notificationHeader2').find('p').hide()
                }
            });

            socket.on('chat:message', function(data){
                if(data.chat_id == btnSend.getAttribute('data-chat-id')){
                    var gData = _base._date(data.updated_at);

                    var logo = data.imageProfile;
                    var msg = data.message;
                    var hour = gData.hour;
                    var css = (user_id_emisor == data.user_id_emisor)? 'two' : 'one';

                    _base._item(logo, msg, hour, css);

                    $('#notificationText').hide();
                    $('#txtMsg').val('');
                }

                var dNotification = {
                    user_id: data.user_id_emisor,
                    user_id_emisor: user_id_emisor,
                    behavior : 1
                };

                _base._notification(dNotification);
                _base._notificationBusiness(data);
            });
        },
        generateIdSocket : function(){
            var userId = user_id_emisor;

            if($('#user_id').length > 0){
                userId = $.trim($('#user_id').val());
            }

            socket.emit('notification:setId', {user_id : userId});
        },
		link: function(){
        	//listado de recomendados
			$('#result').on('click', '.js-chat-link', function(){ // id del content de body de table
			    var userId = $(this).attr('data-id');
                var dataString = 'user_id=' + userId;
                var action = $('#result').attr('data-url-chat');

                $.ajax({
                    type: "POST",
                    url: action,
                    data: dataString,
                    dataType: 'json',
                    success: function(result) {
						if(result.state == 1){
                            window.location.href = result.data.url;
						} else {
							console.log('No se pudo iniciar el chat con el cliente');
						}
                    },
                    error: function(r) {
                        console.log("algo esta mal!");
                    }
                });

				return false;
			});
		},
        notificationUpdate: function(data, behavior){
            var action = $('#content-business').attr('data-url-update-notification');
            var dataString = 'user_id=' + $('#userId').val();
            dataString += '&user_id_emisor=' + user_id_emisor;

            $.ajax({
                type: "GET",
                url: action,
                data: dataString,
                dataType: 'json',
                success: function(result) {
                    if(result.state == 1){
                        if(behavior == 'init'){
                            _base.business();
                        } else {
                            _base._notificationBusiness(data.notificationBusiness);
                        }

                        _base._notification(data);
                    } else {
                        console.log('No se pudo cargar las marcas!');
                    }
                },
                error: function(e) {
                    console.log("algo esta mal!");
                }
            });

        },
		business: function(){
            var userId = $('#userId').val();
            var dataString = 'user_id=' + userId;
            var action = $('#content-business').attr('data-url');

            $.ajax({
                type: "GET",
                url: action,
                data: dataString,
                dataType: 'json',
                success: function(result) {
                    if(result.state == 1){
                        result.data.map(function(item){
                            var css = '';

                            if(item.user_doc._id == userId){
                                css = 'active';

                                $('#btnSend').attr('data-chat-id', item.chat_id);
                            }

                            var html ='';
                            html +='<article class="js-business ' + css + '" data-id="' + item.user_id + '" data-chat="' + item.chat_id + '">';

                            html +='<div class="alertmsg" id="alertmsg" style="float:right;margin-right:5px;">';
                            if(parseInt(item.notification) > 0){
                                if(item.user_doc._id == userId){
                                    var newNotification = parseInt(item.notification) - 1;
                                    html +='<span style="text-align: right;float: right;color : #ffffff;background: #f96464;width: 25px;height: 25px;text-align: center;line-height: 25px;border-radius: 50px">' + item.notification + '</span>';
                                } else {
                                    html +='<span style="text-align: right;float: right;color : #ffffff;background: #f96464;width: 25px;height: 25px;text-align: center;line-height: 25px;border-radius: 50px">' + item.notification + '</span>';
                                }
                            }
                            html +='</div>';
                            html +='<div class="profileImg" style="background-image: url('+item.user_doc.imageProfile+')"></div>';

                            html +='<div class="boxdataprof">';
                            html +='<p style="margin: 0 0 0px;padding: 0 0 0px;overflow:auto;white-space:nowrap; font-size:18px;letter-spacing:.6px;">' + item.user_doc.comp_name+'</p>';
                            html +='<h3 style="margin: 0 0 0px;padding: 0 0 0px;font-size:11px;letter-spacing:.6px;">Representante: '+item.user_doc.representante+'</h3>';
                            html +='</div>';

                            html +='</article>';

                            $('#content-business').append(html);
                        });

                        _base._message();
                    } else {
                        console.log('No se pudo cargar las marcas');
                    }
                },
                error: function(e) {
                    console.log("algo esta mal!");
                }
            });

            $('#content-business').on('click', '.js-business', function(e){
                if(!$(this).hasClass('active')){
                    var url = window.location.toString().split('chat');

                    window.location.href = url[0] + 'chat/' + $(this).attr('data-id');
                }
            });
		},
        _item: function(logo, msg, hour, css){
            var content = $('#content-chat .body-chat');

            var html = '';
            html +='<article class="' + css + '">';
            html +='<p>' + msg;
            html +='<span>' + hour + '</span>';
            html +='</p>';
            html +='</article>';

            content.append(html);
        },
		send: function(){
            var btnSend = document.getElementById('btnSend');
            var message = document.getElementById('txtMsg');

            message.addEventListener('keypress',  function(){
                var data = {
                    user_id_emisor: user_id_emisor,
                    user_id: $('#userId').val(),
                    message: 'Está escribiendo...'
                };

                socket.emit('chat:typing', data);
            });

            message.addEventListener('focus',  function(){
                if($('#content-business .active p').length){
                    var chat_id = btnSend.getAttribute('data-chat-id');
                    var user_id = $('#userId').val();

                    var data = {
                        user_id: null,
                        user_id_emisor: user_id_emisor,
                        behavior : 1,
                        notificationBusiness : {
                            user_id: user_id_emisor,
                            user_id_emisor: user_id,
                            chat_id: chat_id
                        }
                    };

                    _base.notificationUpdate(data, 'update');
                }
            });

            btnSend.addEventListener('click', function(){
            	var value = $.trim(message.value);

            	if(value){
            	    var chat_id = btnSend.getAttribute('data-chat-id');

            	    if(chat_id){
                        var _obj = {
                            chat_id: btnSend.getAttribute('data-chat-id'),
                            user_id: $('#userId').val(),
                            user_id_emisor: user_id_emisor,
                            message: value,
                            updated_at: '',
                            imagePortada: ''
                        }

                        socket.emit('chat:message', _obj);
                    }
				}
			});

		},
        _date: function(str){
            //isodate to time
            var gDate = new Date(str);

            //fecha
            var year = gDate.getFullYear();
            var month = gDate.getMonth()+1;
            var dt = gDate.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }

            var _date = year+'-' + month + '-'+dt;

            //hour
            var hours = gDate.getHours();
            var minutes = gDate.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;

            var _strTime = hours + ':' + minutes + ' ' + ampm;

            var data = {
                date: _date,
                hour: _strTime
            }

            return data;
        },
        _message : function(){
            var chatId = $('#btnSend').attr('data-chat-id');

            if(chatId){
                var page = 1;
                var action = $('#content-chat').attr('data-url')
                var dataString = 'page=' + page;
                dataString += '&chat_id=' + $('#btnSend').attr('data-chat-id');

                $.ajax({
                    type: "GET",
                    url: action,
                    data: dataString,
                    dataType: 'json',
                    success: function(result) {
                        if(result.state == 1){
                            result.data.map(function(item){
                                var gData = _base._date(item.updated_at);

                                var logo = item.user_id.imageProfile;
                                var msg = item.msg;
                                var hour = gData.hour;
                                var css = (user_id_emisor == item.user_id._id)? 'two' : 'one';

                                _base._item(logo, msg, hour, css);
                            });
                        } else {
                            console.log('No se pudo cargar las marcas');
                        }
                    },
                    error: function(e) {
                        console.log("algo esta mal!");
                    }
                });
            }
        },

    };

    _base.init();
});