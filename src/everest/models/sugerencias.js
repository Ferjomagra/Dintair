const mongoose = require('mongoose')
var Schema = mongoose.Schema

var suggest = new Schema({
	comp_name : {type : String},
	name : {type : String},
	mail : {type:String},
	select_type : {type : String},
	text_suggest : {type : String},
	fecha : {type: String},
	fecha_act : {type : String},
	fecha_hora : {type : String},
	nuevafecha : {type : String},
	creator : {type: Schema.Types.ObjectId, ref:'User'},
	status :{
		type: Boolean,
		default: false
	},
	username : {type:String}

})

var Sugerencia = mongoose.model('Sugerencia', suggest)
module.exports = Sugerencia



