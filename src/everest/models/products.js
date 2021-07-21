const mongoose = require('mongoose')
var Schema = mongoose.Schema

var product = new Schema({

	//imagenes
	imgProductos : {type : String},
	imageNull_1 : {type:String},

	nombre : {type : String},
	descripcion : {type : String},
	procedencia : {type : String},
	stock : {type : String},
	tipo_unidades : {type : String},
	peso : {type : String},
	medida : {type : String},
	precio : {type : String},

	precio_min : {type:Number},
	cantidad_min : {type:Number},

	vistas : {type:Number},


	moneda: {type : String},
	color : {type : String},
	dimensiones : {type : String},
	material : {type : String},
	fecha : {type : String},
	nuevafecha : {type : String},
	horaact: {type : String},
	creator: {type: Schema.Types.ObjectId, ref:'User'},

	deleted : {type: Boolean},
	deleteDate : {type : String},
	deleteTime : {type: String},
	targetsell: {type:String}
})

var Products = mongoose.model('Products', product)
module.exports = Products
