const mongoose = require('mongoose')
var Schema = mongoose.Schema

var nCollection = new Schema({
	user_id : {type:String},
    user_id_emisor : {type: Schema.Types.ObjectId, ref:'User'},//persona que visito
    state : {type:Number, default: 0},//0= no vio, 1=vio
	created_at : {type : Date},
    updated_at : {type : Date, default: Date.now},
    deleted_at : {type : Date},

    /*fechas*/
    nuevafecha : {type:String},
	fecha: {type:String},
	horaact: {type:String}
})

var collection = mongoose.model('notification_profile', nCollection)
module.exports = collection
