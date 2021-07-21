const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const data_news_week = new Schema({

	newWeek : {type: Boolean, default : true},



	antetitulo : {type : String},
	titular : {type : String},
	primerParrafo : {type : String},
	piedeImagen : {type : String},

	//titulos
	titulo1 : {type : String},
	titulo2 : {type : String},
	titulo3 : {type : String},
	titulo4 : {type : String},
	titulo5 : {type : String},
	titulo6 : {type : String},
	titulo7 : {type : String},
	titulo8 : {type : String},
	titulo9 : {type : String},


	aspectosPrincipales : {type : String},
	Pparagraph2 : {type : String},
	Pparagraph3 : {type : String},


	aspectosMedios : {type : String},
	Mparagraph2 : {type : String},
	Mparagraph3 : {type : String},



	aspectosSecundarios : {type : String},
	Sparagraph2 : {type : String},
	Sparagraph3 : {type : String},


	redactBy : {type : String},
	Fonts : {type : String},


	creator: {type: Schema.Types.ObjectId, ref:'User'},

	imgNews : {type : String},

	seccion : {type : String},

	dia : {type : String},
	mes : {type : String},
	año : {type : String},

	fecha : {type : String},
	horaact : {type : String},
	nuevafecha : {type : String}
})
var NewsWeek = mongoose.model('NewsWeek', data_news_week)
module.exports = NewsWeek