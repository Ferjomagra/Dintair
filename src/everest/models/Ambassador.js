const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const embajador_marca = new Schema({

	nameAmb : {type: String},
	shortName : {type:String},
	dia_1 : {type: String},
	mes_1 : {type: String},
	año_1 : {type: String},
	country_Amb : {type : String},
	cargoAmb : {type : String},
	funcionAmb : {type : String},
	numAmb : {type : String},
	wtpNumAmb : {type : String},
	emailAmb : {type:String},
	hobbiesAmb : {type:String},

	ambassadorIMGs : {type:String},
	fecha : {type:String},
	horaact : {type:String},
	nuevafecha : {type:String},

	creationDate : {type: Date},
	
	creator: {type: Schema.Types.ObjectId, ref:'User'}
})
var Ambassador = mongoose.model('Ambassador', embajador_marca)
module.exports = Ambassador