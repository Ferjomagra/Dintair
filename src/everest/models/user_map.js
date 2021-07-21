const mongoose = require('mongoose')
var Schema = mongoose.Schema

var nCollection = new Schema({
    user_id : {type: Schema.Types.ObjectId, ref:'User'},//usuario actual
    lat:{type:Number, default: 0},
    lng:{type:Number, default: 0},
    title:{type:String},
    state : {type:Number, default: 0},//0= inactivo, 1=activo
    created_at : {type : Date},
    updated_at : {type : Date, default: Date.now},
    deleted_at : {type : Date}
});


var collection = mongoose.model('user_map', nCollection)
module.exports = collection