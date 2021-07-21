//socket IO
const UserChatSocket = require('./models/user_chat');
const UserChatDetailSocket = require('./models/user_chat_detail');
const User = require('./models/user');

const NotificationProfile = require('./models/notification_profile');

const tool = require('./resource/tool');
const mongoose = require('mongoose');

module.exports = (server) => {
    const SocketIO = require('socket.io');
    const io = SocketIO(server);

    //websocket
    io.on('connection', (socket) => {
        socket.on('chat:message', (data) => {
            var hour = tool.gDateTime();
            hour = hour.split(' ');

            var dataChatDetail = {
                chat_id: data.chat_id,
                user_id: data.user_id_emisor,
                msg: data.message,
                hour: hour[1],
                date: hour[0],
                created_at: Date.now()
            };

            var mUserChat = new UserChatDetailSocket(dataChatDetail);

            mUserChat.save(function(err, doc){
                if(!err){
                    var user_id = mongoose.Types.ObjectId(data.user_id);
                    var filterFather = {chat_id : data.chat_id, user_id : user_id};

                    UserChatSocket.find(filterFather).exec( function(errFather, docFather){
                        if(docFather){
                            var alert = parseInt(docFather[0].alert) + 1;
                            var dData = {alert : alert};

                            UserChatSocket.update(filterFather, dData, function(erroChat, docChat){

                                if(!erroChat){
                                    data.updated_at = doc.updated_at;

                                    var filterUser = {_id: mongoose.Types.ObjectId(data.user_id_emisor)};

                                    User.find(filterUser).exec(function(errUser, docUser){
                                        if(docUser){
                                            data.imagePortada = docUser[0].imagePortada;

                                            io.sockets.emit('chat:message', data);
                                        } else {
                                            console.log('no encontro datos en la tabla user');
                                        }
                                    });

                                } else {
                                    console.log('no se pudo guardar los datos');
                                }
                            });
                        }
                    });
                } else {
                    console.log('No se pudo registrar los datos');
                }
            });
        });

        socket.on('chat:typing', (data) => {
            var userId = data.user_id;

            io.to(userId).emit('chat:typing', data);
        });

        socket.on('notification:setId', (data) => {
            socket.join(data.user_id);//seteamos
        });

        socket.on('notification:get', (data) => {
            var filter = [
                { $match : { user_id: mongoose.Types.ObjectId(data.user_id_emisor) } },
                {$group:{_id:"$chat_id" }}
            ];

            UserChatSocket.aggregate(filter).exec( function(err, doc){
                if(doc.length){
                    var count = doc.length
                    count = (count > 0)? count - 1 : 0;
                    var gId = [];

                    doc.map(function (item, index) {
                        gId.push(item._id);//chat_id

                        if(count == index){

                            var filterHeader = [
                                { $match : {
                                        chat_id : {$in: gId},
                                        alert: {$gt: 0},
                                        user_id: mongoose.Types.ObjectId(data.user_id_emisor), //not
                                    }
                                },
                                {$group:{_id:"$user_id", count:{$sum:1}, alert:{$sum : "$alert"} }}
                            ];

                            UserChatSocket.aggregate(filterHeader).exec( function(errFinal, docFinal){
                                if(docFinal.length){
                                    data.alert = docFinal[0].alert;

                                    if(data.behavior == 0){
                                        console.log('behavior ---->' + 0 + '----' + data.user_id);
                                    }
                                } else {
                                    data.alert = 0;
                                }

                                io.to(data.user_id_emisor).emit('notification:get', data);
                            });
                        }
                    });
                } else {
                    console.log('no ingreso');
                }
            });

        });

        socket.on('notification:getbusiness', (data) => {
            var filter = {user_id: data.user_id, chat_id: data.chat_id}

            UserChatSocket.find(filter).exec(function(err, doc){
                if(doc){
                    io.to(data.user_id).emit('notification:getbusiness', doc[0]);
                }
            });
        });

        //notification profile
        socket.on('notificationProfile:setId', (data) => {
            var userId = 'np_' + data.user_id;

            socket.join(userId);//seteamos
        });

        socket.on('notificationProfile:setAlert', (data) => {
            function alert(){
                var filter = [
                    { $match : { user_id: data.user_id, state:0 } },
                    {$group:{_id:"$user_id", count: {$sum: 1} }}
                ];

                NotificationProfile.aggregate(filter).exec(function(err, doc){
                    if(doc.length){
                        data.alert = doc[0].count;

                        var userId = 'np_' + data.user_id;

                        io.to(userId).emit('notificationProfile:getAlert', data);
                    }
                });
            }

            var filter = {
                user_id: data.user_id,
                user_id_emisor: mongoose.Types.ObjectId(data.user_id_emisor)
            }

            NotificationProfile.find(filter).exec(function(err, doc){
                if(doc.length == 0){

                    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
                    var fechaactual = new Date()

                    //Formato fecha
                    var fechaactual = new Date()
                    var curr_hour = fechaactual.getHours()-5
                    var am_pm_var = (curr_hour < 12) ? 'AM' : 'PM';

                    if(curr_hour == 0){
                        curr_hour = 12;
                    }

                    if(curr_hour > 12){
                        curr_hour = curr_hour - 12;
                    }

                    var curr_min = fechaactual.getMinutes();
                    var nuevafecha = (curr_hour + " : " + curr_min + " " + am_pm_var);
                    var horaactual = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes() + ' : ' + fechaactual.getSeconds());
                    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear());

                    var dNotificationProfile = {
                        user_id: data.user_id,
                        user_id_emisor: mongoose.Types.ObjectId(data.user_id_emisor),
                        created_at: Date(),
                        nuevafecha : nuevafecha,
                        fecha: tiempoact,
                        horaact: horaactual
                    };

                    var mNotificationProfile = new NotificationProfile(dNotificationProfile);

                    mNotificationProfile.save(function(err, doc){
                        if(doc){
                            alert();
                        }
                    });
                } else {
                    var dNotificationProfile = {
                        user_id: data.user_id,
                        user_id_emisor: mongoose.Types.ObjectId(data.user_id_emisor),
                        state:0
                    };

                    NotificationProfile.update({'id': doc._id}, dNotificationProfile, function(err){
                        if(!err){
                            alert();
                        }

                    });
                }
            });
        });

        socket.on('notificationProfile:setAlertCurrent', (data) => {
            function alert(){
                var filter = [
                    { $match : { user_id: data.user_id, state:0 } },
                    {$group:{_id:"$user_id", count: {$sum: 1} }}
                ];

                NotificationProfile.aggregate(filter).exec(function(err, doc){
                    if(doc.length){
                        data.alert = doc[0].count;

                        var userId = 'np_' + data.user_id;

                        io.to(userId).emit('notificationProfile:getAlert', data);
                    }
                });
            }

            alert();
        });

    });
}