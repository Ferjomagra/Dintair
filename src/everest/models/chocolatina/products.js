const mongoose = require('mongoose')
var Schema = mongoose.Schema

var product = new Schema({

	//imagenes
	imgProductos : {type : String},
	imageNull_1 : {type:String},

	nombre : {type : String},
	descripcion : {type : String},
	procedencia : {type : String},
	cantidad: {type : String},
	precio : {type : String},

	vistas : {type:Number},

	fecha : {type : String},
	nuevafecha : {type : String},
	horaact: {type : String},
	creator: {type: Schema.Types.ObjectId, ref:'User'},

	deleted : {type: Boolean},
	deleteDate : {type : String},
	deleteTime : {type: String}
})

var Products = mongoose.model('Products', product)
module.exports = Products