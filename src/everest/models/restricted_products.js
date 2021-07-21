const mongoose = require('mongoose')
var Schema = mongoose.Schema

var restricted = new Schema({

	//imagenes
	imgProductos : {type : String},

	nombre : {type : String},
	iam : {type : String},
	link : {type : String},
	aeropost_link : {type: String},
	//Entidades y documentacion
	entidad : {type : String},
	documents : {type : String},


	tupa_permiso : {type: String},
	precio_permiso : {type: String},
	url_tramite : {type: String},

	
	subpartida : {type : String},
	comentario : {type : String},
	//Fin de entidades y documentacion

	fecha : {type : String},
	nuevafecha : {type : String},
	horaact: {type : String},

	deleted : {type: Boolean},
	deleteDate : {type : String},
	deleteTime : {type: String},

	creator: {type: Schema.Types.ObjectId, ref:'User'},
})

var Restricted_products = mongoose.model('Restricted_products', restricted)
module.exports = Restricted_products