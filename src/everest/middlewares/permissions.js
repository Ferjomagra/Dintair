const User = require('.././models/user')

module.exports = function(showusuario, req, res){

	if(req.method === 'get'){
		return true
	}

	if(typeof showusuario == 'undefined') return false
	

	if(showusuario._id.toString() == res.locals.newUser._id){
		return true
	}

	return false
}
