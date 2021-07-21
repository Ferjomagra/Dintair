const mongoose = require('mongoose')
var Schema = mongoose.Schema

var nCollection = new Schema({
    user_id : {type: Schema.Types.ObjectId, ref: 'User'},//yo
    user_contact_id : {type: Schema.Types.ObjectId, ref:'User'},//mis contactos
	state : {type:Number, default: 0},//0= inactivo, 1=activo
	created_at : {type : Date},
    updated_at : {type : Date, default: Date.now},
    deleted_at : {type : Date}
})

var collection = mongoose.model('user_contact', nCollection)
module.exports = collection
