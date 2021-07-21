const LocalStrategy = require('passport-local').Strategy
const fs = require('fs')
const User = require('../everest/models/user')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const mysql = require('mysql')



module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id)
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user)
		})
	});

	//Signup
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, 


	function(req, username, password, done){
		User.findOne({'username': username}, function(err,user){



			if(err){return done(err)}

			if(user){
				return done(null, false, req.flash('signupMessage', 'El correo ingresado ya está en uso'))
			}

			else {


				var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto",
			      "Septiembre","Octubre","Noviembre","Diciembre")
			    var fechaactual = new Date()
			    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear())
			    var horaact = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes()) -5

			    //Formato fecha
			    var am_pm_var = ""

			    var fechaactual = new Date()

			    var curr_hour = fechaactual.getHours()-5

			    if(curr_hour < 12){
			      am_pm_var = 'AM'
			    }
			    else{
			      am_pm_var = 'PM'
			    }
			    if(curr_hour == 0){
			      curr_hour = 12
			    }
			    if(curr_hour > 12){
			      curr_hour = curr_hour - 12
			    }

			    var curr_min = fechaactual.getMinutes()
			    var nuevafecha = (curr_hour + " : " + curr_min + " " + am_pm_var)
			
				
			    //var token = crypto.randomBytes(20).toString('hex');

				var newUser = new User();

			

				newUser.username =username;
				newUser.password = newUser.generateHash(password);
				newUser.rubroTarget = req.param('rubroTarget');
				//Inicio de Comprador, proveedor o Ambos
				newUser.iam = req.param('iam');
				//Fin de comprador, vendedor o Ambos

				newUser.full_name = req.param('full_name');

				//Extraer primer nombre
				var fullName = newUser.full_name;
				var splitName = fullName.split(' ');
				var NameColect = [];

				var FirstName = splitName[0];

				newUser.first_name = FirstName;

				//console.log('Este nombre es el nuevo: '+newUser.first_name)
				//Fin de extraer primer nombre


				newUser.comp_name = req.param('comp_name');
				var comp_name_2 = newUser.comp_name;
				var new_comp_name = comp_name_2.replace(/\s+/g, "")
				newUser.new_comp_name = new_comp_name;

				newUser.country = req.param('country');
				newUser.skills_comp = '';
				newUser.cant_trabajadores_comp ='';
				newUser.dia = '';
				newUser.mes = '';
				newUser.ano = '';
				newUser.comp_dedicacion = '';
				newUser.direccion = '';
				newUser.comp_inicios = '';
				newUser.pagina_web = '';
				newUser.face_page = '';
				newUser.urlFace = '';
				newUser.sede = '';
				newUser.fecha_signup = tiempoact;
				newUser.hora_signup = fechaactual;
				newUser.RegisterTime = nuevafecha;
				
				newUser.terms_conditions = true;

				newUser.imagePortada = '/images/imgportada.png';
				newUser.imageProfile = '/images/compIcon.png';
				newUser.imageMarket = '/images/imgportada.png';

				resetPasswordToken = '';
				resetPasswordExpires = '';

				newUser.deleted = false;
				newUser.deletedDate = '';
				newUser.deletedTime = '';

				newUser.deleteWhy = '';
				newUser.deleteDescription = '';


				//Para mailgun
				const content = ''

					

			    var api_key = process.env.MAILGUN_API_KEY;
			    var domain = process.env.MAILGUN_DOMAIN;
			    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
			    
			    var data = {
			      from: 'Dintair <Noreply@dintair.com>',
			      to: newUser.username,
			      subject: 'Correo electrónico de confirmación',
			      //text: 'Bienvenido a Ev+erest',
			      //html: 'Bienvenido a Everest '+ newUser.comp_name
			      html: '<body style="margin: 0px; padding: 0px; background: hsl(0, 0%, 99%); padding: 0px; text-align: center;">'+

			      			'<div style="text-align: center; width: 100%; margin: 0 auto; max-width: 600px; background: white; padding: 0px; border-bottom: 1px solid #d9d9d9;">'+

			                    '<div class="img" style="margin-bottom: 10px; margin: 0 auto; text-align: center;">'+
			                    	
			                    	'<img style="width:100%; margin: 0 auto; max-width: 100%;" src="https://res.cloudinary.com/drdmb9g49/image/upload/v1539607454/welcome_email_eyeuge.png">'+
			                    	
			                    '</div>'+

			                    '<div style="padding-left: 5px; padding-right: 5px; padding-bottom: 10px; margin-top: 20px; border-bottom: 1px solid #d9d9d9;">'+

			                    	'<h3 style="font-size: 15px; color: #0086b3; font-weight: bold; text-align: left; letter-spacing: 0.2px; margin: 0 0 0px; margin-bottom: 20px;"> Hola '+newUser.first_name+ ','+'</h3>'+

			                    	'<h3 style="font-size: 15px; color: #737373; text-align: left; letter-spacing: 0.2px; margin: 0 0 0px; margin-bottom: 20px;"> Nos es grato darle la bienvenida a esta familia. De clic en "Ingresar a mi cuenta" para que finalice con su registro y empiece a utilizar nuestros servicios.</h3>'+

			                    	'<a href="https://www.dintair.com/Dintair/es/Signin">'+
			                    		'<button style="width: 250px; padding:5px; background: #1a75ff; border-radius: 4px; color: white; border: 1px solid #1a75ff; outline:none;">Ingresar a mi cuenta</button>'+
			                    	'</a>'+


			                    '</div>'+

			                    '<div style="margin-bottom:20px; margin-top:20px; padding-left: 5px; padding-right: 5px;">'+

				                    '<h4 style="margin: 0 0 0px; text-align: left; color: #737373; letter-spacing: 0.2px; padding-top: 0px"> Muchas gracias, </h4>'+

				         			'<h4 style="margin: 0 0 0px; text-align: left; color: #737373; letter-spacing: 0.2px; padding-top: 10px;"> El equipo de Dintair</h4>'+
				         		'</div>'+

			         			'<div style="text-align: center; margin: 0 auto; width: 100%; padding: 5px;>'+

			         				'<ul style="margin: 0 0 0px;">'+
			         					'<li class="inline" style="margin: 0 0 0px; padding-right: 5px; list-style: none; display: inline-block;">'+
					         				'<a class="terms" href="https://www.dintair.com/Dintair/privacyPolice">'+
					         					'<p style="margin: 0 0 0px; color: #1a75ff;">Política de privacidad</p>'+
					         				'</a>'+
					         			'</li>'+

					         			'<li class="inline" style="margin: 0 0 0px; padding-left: 5px; list-style: none; display: inline-block;">'+
					         				'<a class="terms" href="https://www.dintair.com/Dintair/termsOfUse">'+
					         					'<p style="margin: 0 0 0px; color: #1a75ff;">Condiciones de uso</p>'+
					         				'</a>'+
					         			'</li>'+
					         		'</ul>'+
			         			'</div>'+

			         			'<h4 style="color: #737373; font-size: 12px; letter-spacing: 0.2px;"> © Copyright 2018, Dintair all rights reserved </h4>'+
			         			'<h4 style="color: #737373; font-size: 10px; letter-spacing: 0.2px;"> Av. El Derby 575, Santiago de Surco, Lima, Perú </h4>'+

			                '</div>'+
			      		'</body>'
			      
			    };
			     
			    /*mailgun.messages().send(data, function (error, body) {
			      if(error){
			        console.log(error)
			      }
			        console.log(body);
			    });*/
			    //Fin de para mailgun

				newUser.save(function(err){
					if(err){throw err}
					req.flash('messwelcome' , 'Bienvenido a Dintair, ' + newUser.first_name + '.')
					return done(null, newUser)
				})



				/*INICIO DE MYSQL

				var con = mysql.createConnection({
					host:"localhost",
					port:"3306",
					user:"root",
					password:"ariados",
					database:"dintairDB"
				});

				var newUserMysql = new Object();
				newUserMysql.username = username;
				newUserMysql.fullName = req.param('full_name');
				newUserMysql.skills_comp = req.param('skills_comp');
				newUserMysql.comp_name = req.param('comp_name');
				newUserMysql.rubroTarget = req.param('rubroTarget');


				con.connect(function(err){
					if(err) throw err;
					console.log("Connected!")

					con.query("CREATE DATABASE dintairDB", function(err, result){
						if(err) throw err;
						console.log("Database created")
					})

					var sql = "CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255), fullName VARCHAR(255), skills_comp VARCHAR(255), comp_name VARCHAR(255), rubroTarget VARCHAR(255))";
					con.query(sql,function(err, result){
						if(err) throw err;
						console.log("Table created");
					})

					var sql = "INSERT INTO users (username,fullName) values ('"+username +"','"+fullName+"')";
					con.query(sql, function(err,result){
						if(err) throw err;
						console.log("Datos insertados")
					})
				})

				FIN DE MYSQL*/
			}
		})
	}));





	//Login
	passport.use('local-signin', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, 
	function(req, username, password, done){
		User.findOne({'username': username}, function(err,user){
			if(err){return done(err)}
			if(!user){
				return done(null, false, req.flash('loginMessage', 'Email o contraseña incorrectas'))
			}
			if(!user.validatePassword(password)){
				return done(null, false, req.flash('loginMessage', 'Email o contraseña incorrectas'))
			} 
			return done(null, user)
		})
	}));

}