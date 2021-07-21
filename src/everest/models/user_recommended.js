const mongoose = require('mongoose')
var Schema = mongoose.Schema

var nCollection = new Schema({
    user_id : {type:String},//yo
    user_contact_id : {type: Schema.Types.ObjectId, ref:'User'},//mis recomendados
	state : {type:Number, default: 0},//0= inactivo, 1=activo
	created_at : {type : Date},
    updated_at : {type : Date, default: Date.now},
    deleted_at : {type : Date}
})

var collection = mongoose.model('user_recommended', nCollection)
module.exports = collection