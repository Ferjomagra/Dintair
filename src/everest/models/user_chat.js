const mongoose = require('mongoose')
var Schema = mongoose.Schema

var nCollection = new Schema({
	chat_id : {type:String},//id del chat
	user_id : {type: Schema.Types.ObjectId, ref:'User'},
	msg : {type:String},
	alert: {type: Number, default: 0}, //cantidad de alertas que tiene cada persona
	state : {type:Number, default: 0},//0= inactivo, 1=activo
	created_at : {type : Date},
    updated_at : {type : Date, default: Date.now},
    deleted_at : {type : Date}
})

var collection = mongoose.model('user_chat', nCollection)
module.exports = collection
