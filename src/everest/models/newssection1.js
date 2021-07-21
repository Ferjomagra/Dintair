const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema


const newssection1 = new Schema({

	antetitulo: {type: String},
	titular: {type:String},
	postitulo: {type: String},

	imageURL : {type:String},
	pieimg : {type:String},

	subtitulo: {type:String},
	subtitulo_1 : {type:String},

	lead: {type: String},
	lead_1 : {type:String},

	cuerpo: {type: String},
	cuerpo_1: {type:String},

	autor: {type:String},
	fecha: {type:String},
	fecha_hora: {type:Date},
	creator: {type: Schema.Types.ObjectId, ref:'User'}
	
})
var Newssection1 = mongoose.model('Newssection1', newssection1)
module.exports = Newssection1