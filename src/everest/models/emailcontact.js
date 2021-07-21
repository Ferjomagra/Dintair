const mongoose = require('mongoose')
var Schema = mongoose.Schema

var contactmail = new Schema({
	comp_name : {type : String},
	myemail : {type:String},
	full_name : {type:String},
	targetemail : {type:String},
	subject : {type : String},
	message : {type : String},
	fecha : {type: String},
	fecha_act : {type : String},
	fecha_hora : {type : String},
	nuevafecha : {type : String},
	creator : {type: Schema.Types.ObjectId, ref:'User'},
	status :{
		type: Boolean,
		default: false
	}

})

var emailContact = mongoose.model('emailContact', contactmail)
module.exports = emailContact


