const mongoose = require('mongoose')
var Schema = mongoose.Schema

var services = new Schema({

	name_serv : {type:String},
	tipo_serv : {type:String},
	desc_serv : {type:String},
	origin_serv : {type:String},
	especialidades_serv : {type: String},
	imageServicios : {type:String},
	fecha_creacion : {type:String},
	hora_creacion : {type:String},
	vistas : {type:Number},

	nuevafecha : {type:String},

	creator: {type: Schema.Types.ObjectId, ref:'User'},

	deleted : {type:Boolean},
	deleteDate : {type: String},
	deleteTime : {type: String},
	targetsell: {type:String},

	//time
	hora_apertura : {type:String},
	hora_cierre : {type:String},
	dia_aper : {type:String},
	dia_cierr : {type:String} 
})

var Servicios = mongoose.model('Servicios', services)
module.exports = Servicios
