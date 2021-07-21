const mongoose = require('mongoose')
var Schema = mongoose.Schema

var nCollection = new Schema({
	chat_id : {type:String},//id del chat
	user_id : {type: Schema.Types.ObjectId, ref:'User'},
	msg : {type:String},
    state_alert: {type: Number, default: 0}, //0= no leido, 1=leido
    state : {type:Number, default: 0},//0= inactivo, 1=activo
	date:{type: String},
	hour:{type: String},
	created_at : {type : Date},
    updated_at : {type : Date, default: Date.now},
    deleted_at : {type : Date}
})

var collection = mongoose.model('user_chat_detail', nCollection)
module.exports = collection