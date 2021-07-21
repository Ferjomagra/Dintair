const mongoose = require('mongoose')
var Schema = mongoose.Schema

var nCollection = new Schema({
	estemensaje: {type:String},
	imagePublics : {type:String},
	nuevafecha : {type:String},
	fecha: {type:String},
	horaact: {type:String},
	creator: {type: Schema.Types.ObjectId, ref:'User'},
	urldintair: {type:String},
	urlfacebook: {type:String},
	urlinstagram: {type:String},
	urllinkedin: {type:String},
	status :{type: Boolean,default: false},
	like: {type:Number, default:0},//numero de like que tiene el post
	deleted : {type: Boolean},
	deleteDate : {type:String},
	deleteTime : {type: String},
    created_at : {type: String}
})

var Publications = mongoose.model('publication_recommended', nCollection)
module.exports = Publications