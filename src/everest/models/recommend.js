const mongoose = require('mongoose')
var Schema = mongoose.Schema

var text_recommend = new Schema({
	country_message : {type : String, required : true},
	prod_message : {type : String, required : true},
	//mail_message : {type : String, required : true},
	fecha: {type: String},
	horaact : {type:String}
})

var Recommend = mongoose.model('Recommend', text_recommend)
module.exports = Recommend
