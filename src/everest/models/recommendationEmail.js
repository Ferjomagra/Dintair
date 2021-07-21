const mongoose = require('mongoose')
var Schema = mongoose.Schema
var _table = 'recommendation_email'

var schemaTable = new Schema({
	imageProfile: {type:String},
	comp_name: {type:String},
	user_id : {type:String},
	email: {type:String},
    representative: {type:String}
})

var model = mongoose.model(_table, schemaTable)
module.exports = model