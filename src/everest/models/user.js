const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({

	//imagen
	imageProfile : {type:String},
	imagePortada : {type:String},
	imageMarket : {type:String},

	//dato principal
	username : { type: String, require: true},
	rubroTarget : {type: String, require: true},
	iam : {type:String},
	comp_dedicacion: {type:String},
	full_name: {type:String},
	first_name: {type:String},
	comp_name: { type: String },
	
	new_comp_name: {type:String},

	comp_inicios: {type: String},
	comp_mision: {type: String},
	comp_vision: {type: String},
	country: { type: String, require: true},
	provincia : {type:String, require:true},
	skills_comp : {type: String},
	cant_trabajadores_comp : {type: String},

	terms_conditions : {type: String, require: true},

	//dato adicional
	pagina_web: {type:String},
	face_page: {type: String},
	urlFace : {type:String},
	direccion: {type:String},
	wtpnumber: {type:String},

	//otros
	password: { type: String, require: true},
	repp_password : { type: String},
	dia: {type: String},
	mes: {type: String},
	ano: {type: String},
	fecha_signup: {type:String},
	hora_signup : {type:String},
	RegisterTime : {type:String},

	resetPasswordToken : {type : String},
	resetPasswordExpires : {type: Date},

	deleted : {type: Boolean},
	deletedDate : {type : String},
	deletedTime : {type : String},
	
	deleteWhy : {type : String},
	deleteDescription : {type : String},

	vistas : {type:Number},

	id_url:{type:Number}
	//id_url:{type: Schema.Types.ObjectId}

	
})

userSchema.plugin(passportLocalMongoose)


//generate Hash
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

//checking if password is valid

userSchema.methods.validatePassword = function(password){
	return bcrypt.compareSync(password, this.password)
}


var User = mongoose.model('User', userSchema)
module.exports = User
