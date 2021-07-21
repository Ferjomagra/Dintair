var Recommend = require('./models/recommend');
const Products = require('./models/products');
var dateformat = require('dateformat')
const Publications = require('./models/publicaciones')
const PublicationRecommended = require('./models/publication_recommended')

const User = require('./models/user')
const newssection1 = require('./models/newssection1')/**/
const Servicios = require('./models/services')
const Sugerencia = require('./models/sugerencias')
const Ambassador = require('./models/Ambassador')
const News = require('./models/News')/**/
const NewsWeek = require('./models/NewsWeek')/**/
const UserChat = require('./models/user_chat')
const UserChatDetail = require('./models/user_chat_detail')
const UserContact = require('./models/user_contact')
const PublicationLike = require('./models/publicaciones_like')
const PublicationRecommendedLike = require('./models/publication_recommended_like')
const UserRecommended = require('./models/user_recommended')
const UserRecommendedTemp = require('./models/user_recommended_temp')
const emailContact = require('./models/emailcontact')

/*AEROPOST*/
const Restricted_products = require('./models/restricted_products')
/*FIN DE AEROPOST*/
/*New bd recommend*/
 
const recommendedEmail = require('./models/recommendationEmail');
const recommended = require('./resource/recommended');
const tool = require('./resource/tool');
/*bd recommend*/

const UserMap = require('./models/user_map')

const NotificationProfile = require('./models/notification_profile');


const async = require("async");
const crypto = require("crypto");
const fs = require('fs')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const UploadTavo = require('./resource/upload')

const mysql = require('mysql')

/*INICIO DE MULTER*/

const multer = require('multer')
var storage = multer.diskStorage({
  destination: './uploads',
  filename: function(req,file,callback){
    callback(null, Date.now() + file.originalname)
  }
})

var imageFilter = function(req,file,cb){
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}

var upload = multer({
  storage: storage,
  imageFilter : imageFilter,
  limits: { fieldSize: 25 * 1024 * 1024 }
})


//inicio multiple files
var storageMultiple = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var uploadMultiple = multer({ storage : storageMultiple }).array('imgProducto',12);
//fin multiple files

var cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

var cloudinary_users = require('cloudinary')
cloudinary_users.config({
  cloud_name: process.env.CLOUDINARY_USERS_NAME,
  api_key: process.env.CLOUDINARY_USERS_API_KEY,
  api_secret: process.env.CLOUDINARY_USERS_API_SECRET
})
/*FIN DE MULTER*/






/*PARA SEARCHING*/
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
/*FIN DE SEARCHING*/

/*INICIO DE EMAIL*/

/*FIN DE EMAIL*/


//Module export es el recipiente || export
module.exports = (app, passport) =>{

  app.get('/Dintair/FromFerToPieri', (req,res)=>{
    res.render('espanol/ferandpieri')
  }),

  app.get('/Dintair/scroll', (req,res)=>{
    res.render('espanol/testScroll')
  }),

  /*INICIO DE CATALOGOS COMPANIES*/
  app.get('/Dintair/index/products', (req,res)=>{
    res.render('espanol/companies/brochures/companies')
  }),

  app.get('/Dintair/services/recommendations', (req,res)=>{
    res.render('espanol/companies/recommends/recommend')
  }),
  /*FIN DE CATALOGOS COMPANIES*/

  /*INICIO DE CONTACTO*/
  app.get('/Dintair/contact', (req,res)=>{
    res.render('espanol/contact', {
      success : req.flash('success'),
      message : req.flash('messagesend'),
      messageReset : req.flash('resetMessage')
    })
  }),
  app.post('/Dintair/contact/us', (req,res)=>{
    
    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto",
      "Septiembre","Octubre","Noviembre","Diciembre")

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

    var horaactual = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes() + ' : ' + fechaactual.getSeconds())
    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear())
    var fecha = (fechaactual.getDate()+'/'+meses[fechaactual.getMonth()]+'/'+fechaactual.getFullYear())

    var sugerencia = {
      
      name : req.body.name_p,
      mail : req.body.mail,
      select_type : req.body.select_type,
      text_suggest : req.body.text_suggest,
      fecha_act : fecha,
      fecha : tiempoact,
      fecha_hora : horaactual,
      nuevafecha : nuevafecha,

      status : false
    }

    var suggests = new Sugerencia(sugerencia)
 

    suggests.save(function(err){

      if(!err){
        req.flash('success', 'Mensaje enviado correctamente')
        res.redirect('/Dintair/contact')
        console.log(suggests)
      } else {
        res.render('/Dintair/contact')
        console.log('Sugerencia no enviada')
      }
    })

  }),
  /*FIN DE CONTACTO*/

  /*INICIO DE MAKICAPCHI*/
  app.get('/Dintair/companies/makicapchi', (req,res)=>{
    res.render('espanol/companies/makicapchi/index')
  }),
  /**/
  

  

  /*INICIO DE POLÍTICAS DE PRIVACIDAD*/
  app.get('/profile/:new_comp_name'+ '-' +':id_url', (req,res)=>{
    var idurl = req.params.id_url
    console.log('id_url: '+idurl)
    var perPage = 6

    User.findOne({id_url:idurl}).populate('_id').exec(  
      function(err, userurl){
        if(err){
          res.redirect('/Dintair')
          return
        }
        Products.find({idurl}).populate('creator').limit(perPage).exec(
          function(err, allproducto){
            if(err){
              res.redirect('/Dintair')
              return
            }
            res.render('espanol/profile_user', {
              newUser : userurl,
              message : req.flash('messagesend'),
              messageReset : req.flash('resetMessage'),
              allproducto: allproducto
            })
          }
        )
      }
    )
  }),


  app.get('/Dintair/privacyPolice', (req,res)=>{
    res.render('espanol/privacy')
  }),

  app.get('/Dintair/termsOfUse', (req,res)=>{
    res.render('espanol/termsOfUse')
  }),

  /*FIN DE POLÍTICAS DE PRIVACIDAD*/

  /*app.get('/', (req, res) =>{
    res.render('home', {
      messageReset : req.flash('resetMessage')
    })
  }),*/

  app.get('/', (req,res) =>{
    res.render('espanol/Principal',{
      message : req.flash('messagesend'),
      messageReset : req.flash('resetMessage')
    })
  }),

  app.get('/Dintair/products/:id', (req,res)=>{

    var id_producto = req.params.id
    var token = req.params.token

    Products.findById({'_id':id_producto}).populate('creator').exec(
      function(err,productos){
        var files = '';

        if(productos.imgProductos != '' ){
            files = productos.imgProductos.split('---');

            console.log('mostrando array de files------>');
            console.log(files);
        }

        productos.files = files;

        res.render('espanol/companies/productos', {
          productos_user: productos, 
          message : req.flash('messagesend'),
          messageReset : req.flash('resetMessage')
        })
      }  
    )
  }),

  //INICIO DE AEROPOST
  app.get('/Dintair/aeropost', (req,res)=>{
    Restricted_products.find({}).exec((err, aeroproductos)=>{
      if(err){
        res.redirect('/')
        return
      }
      res.render('espanol/aeropost/index',{
        aeroproductos : aeroproductos,
        message : req.flash('messagesend'),
        messageReset : req.flash('resetMessage')
      })
    });
  }),

  app.get('/Dintair/product/:id', (req,res)=>{
    var id_restrict = req.params.id
    Restricted_products.findById({'_id':id_restrict}, function(err, aeroprods){
      res.render('espanol/aeropost/product_id',{
        restricted_product : aeroprods,
        user: req.user
      })
    })
  }),
  //busqueda en el header
  app.post('/Dintair/aeropost/search', (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      //productos
      
      var filter = {
        'nombre' : new RegExp(req.body.search, "i"),
        'deleted': false
      }; // ----> /value/i

      console.log(filter);

      Restricted_products.find(filter).limit(10).exec( function(err, docProduct){
          if(docProduct){
              var result = {
                state: 1,
                msg: 'ok!',
                data: docProduct
              }
              console.log(docProduct);

              res.send(JSON.stringify(result));
              
          } else {
            var result = {
              state: 0,
              msg: 'No se pudo traer los productos!',
              data: {}
            }

            res.send(JSON.stringify(result));
          }
      })

  }),
  app.get('/Dintair/restricted', isLoggedIn, (req,res)=>{
    res.render('espanol/aeropost/add_product',{
      user: req.user,
      messageprod : req.flash('messageprod')
    })
  }),

  app.post('/Dintair/add/restricted', isLoggedIn, (req,res)=>{
    res.setHeader('Content-Type', 'application/json');

    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var fechaactual = new Date()

    //Formato fecha
    var fechaactual = new Date()
    var curr_hour = fechaactual.getHours()-5
    var am_pm_var = (curr_hour < 12) ? 'AM' : 'PM';

    if(curr_hour == 0){
        curr_hour = 12;
    }
    if(curr_hour > 12){
        curr_hour = curr_hour - 12;
    }

    var curr_min = fechaactual.getMinutes();
    var nuevafecha = (curr_hour + " : " + curr_min + " " + am_pm_var);
    var horaactual = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes() + ' : ' + fechaactual.getSeconds());
    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear());

    var data_restricted = {
        nombre : req.body.nombre,
        iam : req.body.iam,
        link : req.body.link,
        aeropost_link : req.body.aeropost_link,
        entidad : req.body.entidad,
        documents : req.body.documents,

        tupa_permiso : req.body.tupa_permiso,
        precio_permiso : req.body.precio_permiso,
        url_tramite : req.body.url_tramite,

        subpartida : req.body.subpartida,
        comentario : req.body.comentario,

        fecha: tiempoact,
        horaact: horaactual,
        nuevafecha : nuevafecha,
        creator: req.body.id,
        imgProductos : '/images/img_defectproducts_none-01.jpg',
        deleted : false
    }

    var restricted_product = new Restricted_products(data_restricted);
    var result = {state : 0, msg : 'No se pudo registrar'};
    var files = JSON.parse(req.body.files);

     if(files.length){
         function saveData(newRoute){
             restricted_product.imgProductos = newRoute;
             restricted_product.save(function(err){
                 if(!err){
                     req.flash('messageprod' , 'Producto ' + restricted_product.iam + ', creado')

                     result = {
                         state : 1,
                         msg : 'ok',
                         data: {url: '/Dintair/restricted'}
                     };
                 } else {
                     result = {state : 0, msg : 'No se registrar los cambios'};
                 }

                 res.send(JSON.stringify(result));
             });
         }

         var count = files.length;
         var index = 0;
         var newRoute = '';

         files.map((item) => {
             var newFile = UploadTavo()._getFile(item);
             var nameFile = UploadTavo()._getRandom(5) + '-' + req.body.id + '.' + newFile.type;
             var routeFile = './uploads/' + nameFile;

             fs.writeFile(routeFile, newFile.data, {encoding: 'base64'}, function(err) {
                 if (err) {
                     console.log('err', err);
                 } else {
                     cloudinary_users.uploader.upload(routeFile, function(result) {
                         newRoute = (newRoute)? newRoute + '---' + result.url : result.url;

                         index++;
                         if(index == count){
                             saveData(newRoute);
                         }
                     })
                 }
             });
         });
    } else {
      restricted_product.save(function(err){
          if(!err){
              req.flash('messageprod' , 'Producto ' + restricted_product.iam + ', creado')

              result = {
                  state : 1,
                  msg : 'ok',
                  data: {url: '/Dintair/restricted'}
              };
          } else {
              result = {state : 0, msg : 'No se pudieron registrar los cambios, intentelo mas tarde'};
          }

          res.send(JSON.stringify(result));
      })
    }
  }),

  app.get('/Dintair/myrecords', isLoggedIn, (req,res)=>{
    res.render('espanol/aeropost/view_aeroproducts',{
      user: req.user
    })
  }),
  app.post('/Dintair/aeropost/search/users', isLoggedIn, (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      //productos
      
      var filter = {
        'nombre' : new RegExp(req.body.search, "i"),
        'deleted': false
      }; // ----> /value/i

      console.log(filter);

      Restricted_products.find(filter).limit(10).exec( function(err, docProduct){
          if(docProduct){
              var result = {
                  state: 1,
                  msg: 'ok!',
                  data: docProduct
              }

              console.log(docProduct);

              res.send(JSON.stringify(result));
          } else {
              var result = {
                  state: 0,
                  msg: 'No se pudo traer los productos!',
                  data: {}
              }

              res.send(JSON.stringify(result));
          }
      })

  }),
  app.get('/Dintair/restricted/:id', isLoggedIn, (req,res)=>{
    var id_restrict = req.params.id
    Restricted_products.findById({'_id':id_restrict}, function(err, aeroprods){
      var files = '';

      if(aeroprods.imgProductos != '' ){
          files = aeroprods.imgProductos.split('---');

          console.log('mostrando array de files------>');
          console.log(files);
      }

      aeroprods.files = files;

      res.render('espanol/aeropost/edit',{
        restricted_product : aeroprods,
        user: req.user
      })
    })
  }),
  app.put("/Dintair/restricted/put/:id", isLoggedIn, (req,res)=>{
    res.setHeader('Content-Type', 'application/json');

    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var fechaactual = new Date()

    var data_restricted = {
        nombre : req.body.nombre,
        iam : req.body.iam,
        link : req.body.link,
        aeropost_link : req.body.aeropost_link,
        entidad : req.body.entidad,
        documents : req.body.documents,
        subpartida : req.body.subpartida,
        comentario : req.body.comentario,
        tupa_permiso : req.body.tupa_permiso,
        precio_permiso : req.body.precio_permiso,
        url_tramite : req.body.url_tramite
    }

    var result = {state : 0, msg : 'No se pudo registrar'};
    var files = JSON.parse(req.body.files);

    if(files.length){
      Restricted_products.update({'_id': req.params.id}, data_restricted, function(aeropostProducts){
        result = {
          state : 1,
          msg : 'ok datos',
          data: {url: '/Dintair'}
        };
      })

      function saveData(newRoute){
          data_restricted.imgProductos = newRoute;

          Restricted_products.update({'_id': req.params.id}, data_restricted, function(err){
            if(!err){
                result = {
                    state : 1,
                    msg : 'ok',
                    data: {url: '/Dintair/myrecords'}
                };
            } else {
                result = {state : 0, msg : 'No se registraron los cambios'};
            }

            res.send(JSON.stringify(result));
          });
      }

      var count = files.length;
      var index = 0;
      var newRoute = '';

      files.map((item) => {
        var newFile = UploadTavo()._getFile(item);
        var nameFile = UploadTavo()._getRandom(5) + '-' + req.params.id + '.' + newFile.type;
        var routeFile = './uploads/' + nameFile;

        fs.writeFile(routeFile, newFile.data, {encoding: 'base64'}, function(err) {
            if (err) {
                console.log('err', err);
            } else {
                cloudinary_users.uploader.upload(routeFile, function(result) {
                    newRoute = (newRoute)? newRoute + '---' + result.url : result.url;

                    index++;
                    if(index == count){
                        newRoute = (req.body.fileOld)? req.body.fileOld + '---' + newRoute : newRoute;
                        saveData(newRoute);
                    }
                })
            }
        });
      });
    } else {
      Restricted_products.update({'_id': req.params.id}, data_restricted, function(err){
          if(!err){
            result = {
                state : 1,
                msg : 'ok',
                data: {url: '/Dintair/myrecords'}
            };
          } else {
              result = {state : 0, msg : 'No se pudo modificar los cambios, intentelo mas tarde'};
          }

          res.send(JSON.stringify(result));
      })
    }
  }),
  //FIN DE AEROPOST

  //INICIO DE NEWSBOOK
  
  app.get('/Dintair/Newsbook', (req,res)=>{
    NewsWeek.find({}, function(err, newsWeek){
      if(err){
        res.redirect('/')
        return
      }
      News.find({}, function(err, news){
        if(err){
          res.redirect('/')
          return
        }
        res.render('espanol/newsbook', {
          message : req.flash('messagesend'),
          messageReset : req.flash('resetMessage'),
          newsWeek : newsWeek,
          news : news.reverse()
        })
      })
    })
  }),
  app.get('/Dintair/Newsbook/week/:id', (req,res)=>{
    var idnews = req.params.id

    NewsWeek.findById({'_id': idnews}, function(err, showWeek){
      if(err){
        res.redirect('/Dintair')
        return
      }
      res.render('espanol/forNews/newsWeek', {
        message : req.flash('messagesend'),
        messageReset : req.flash('resetMessage'),
        dataNewsS : showWeek
      })
    })
  }),
  app.get('/Dintair/Newsbook/day/:id', (req,res)=>{
    var idnews = req.params.id

    News.findById({'_id': idnews}, function(err, showWeek){
      if(err){
        res.redirect('/Dintair')
        return
      }
      res.render('espanol/forNews/newsday', {
        message : req.flash('messagesend'),
        messageReset : req.flash('resetMessage'),
        dataNewsS : showWeek
      })
    })
  }),

  app.get('/Dintair/Newsbook/Feriadex', (req,res)=>{
    NewsWeek.find({}, function(err, newsWeek){
      if(err){
        res.redirect('/')
        return
      }
      News.find({}, function(err, news){
        if(err){
          res.redirect('/')
          return
        }
        res.render('espanol/forNews/feriadex', {
          message : req.flash('messagesend'),
          messageReset : req.flash('resetMessage'),
          newsWeek : newsWeek,
          news : news.reverse()
        })
      })
    })
  }),

  app.get('/Dintair/Newsbook/districts', (req,res)=>{
    NewsWeek.find({}, function(err, newsWeek){
      if(err){
        res.redirect('/')
        return
      }
      News.find({}, function(err, news){
        if(err){
          res.redirect('/')
          return
        }
        res.render('espanol/forNews/distritos', {
          message : req.flash('messagesend'),
          messageReset : req.flash('resetMessage'),
          newsWeek : newsWeek,
          news : news.reverse()
        })
      })
    })
  }),

  app.get('/Dintair/Newsbook/feriaJockey/navJockey', (req, res)=>{
    News.find({}, function(err, news){
      if(err){
        res.redirect('/')
        return
      }
      res.render('espanol/forNews/navJockey', {
        message : req.flash('messagesend'),
        messageReset : req.flash('resetMessage'),
        news : news.reverse()
      })
    })
  }),

  app.get('/Dintair/Newsbook/ExpoProveedores/navExpo', (req,res)=>{
    News.find({}, function(err, news){
      if(err){
        res.redirect('/')
        return
      }
      res.render('espanol/forNews/ExpoProveedores', {
        message : req.flash('messagesend'),
        messageReset : req.flash('resetMessage'),
        news : news.reverse()
      })
    })
  }),

  //FIN DE NEWSBOOK


  app.get('/Dintair/es/Advertise', (req,res) =>{
    res.render('espanol/advertise')
  }),

  app.get('/Dintair/es/Signup', (req,res) =>{
    res.render('espanol/signup', {
      message : req.flash('signupMessage'),
      check : req.flash('check'),
      messageReset : req.flash('resetMessage')
    })
  }),

  /*app.get('/Dintair/es/Signup', (req,res) =>{
    res.render('espanol/register', {
      message : req.flash('signupMessage'),
      check : req.flash('check'),
      messageReset : req.flash('resetMessage')
    })
  }),*/

  app.get('/Dintair/es/concurso', (req,res)=>{
    res.render('espanol/concurso')
  }),

  app.post('/Dintair/es/Signup', passport.authenticate('local-signup', {
    
    successRedirect: '/Dintair/preview/register',
    failureRedirect: '/Dintair/es/Signup',
    failureFlash: true
  })),


  /*INICIO DE FORGOT MY PASSWORD*/
  app.get('/Dintair/passwordReset/new', (req,res)=>{
    res.render('espanol/passwordReset', {
      messageReset : req.flash('resetMessage')
    })
  }),


  app.post('/Dintair/passwordReset/new', function(req,res,next){
    async.waterfall([
      function(done){
        crypto.randomBytes(20, function(err, buf){
          var token = buf.toString('hex');
          done(err, token)
        })
      },

      function(token, done){
        User.findOne({username : req.body.username}, function(err, user){
          if(!user){
            req.flash('resetMessage', 'Email incorrecto')
            return res.redirect('/Dintair/passwordReset/new');
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000;

          user.save(function(err){
            done(err, token, user)
          })
        })
      },
      function(token, user, done){
        //Para mailgun
        const content = ''
        var api_key = 'key-d8214dad23cb6f4a0b54f5d346cb3656';
        var domain = 'dintair.com';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
         
        var data = {
          from: 'Dintair <Noreply@dintair.com>',
          to: req.body.username,
          subject: 'Restauración de contraseña',
          //text: 'Bienvenido a Everest',
          //html: 'Bienvenido a Everest '+ newUser.comp_name
          //html: fs.readFileSync('src/views/espanol/foremails/pass_reset.html', 'utf-8')
          /*'<a href="https://' + req.headers.host + '/Dintair/passwordReset/new/procedure/' + token + '\n\n">'+
                        '<button style="width: 250px; padding:5px; background: #1a75ff; border-radius: 4px; color: white; border: 1px solid #1a75ff; outline: none;"> Restaurar mi contraseña </button>'+
                      '</a>'+*/
          html: '<body style="margin: 0px; padding: 0px; background: hsl(0, 0%, 99%); padding: 0px; text-align: center;"">'+
                  '<div style="text-align: center; width: 100%; margin: 0 auto; max-width: 600px; background: white; padding: 5px; border-bottom: 1px solid #e6e6e6;">'+
                    '<div style="text-align: center; margin-top: 10px; margin-bottom: 10px; margin: 0 auto;">'+
                      '<img style="width: 65px;" src="https://res.cloudinary.com/drdmb9g49/image/upload/v1539535590/Dintair%20images/dintair_iso.png">'+
                    '</div>'+

                    '<div style="padding-left: 5px; padding-right: 5px; padding-bottom: 10px; margin-top: 20px; border-bottom: 1px solid #e6e6e6;">'+
                      '<p style="font-size: 15px; color: #0086b3; font-weight: bold; text-align: left; letter-spacing: 0.2px; margin: 0 0 0px; margin-bottom: 20px;"> Hola, </p>'+
                      '<p style="font-size: 15px; color: #737373; text-align: left; letter-spacing: 0.2px; margin: 0 0 0px; margin-bottom: 20px;">Ha recibido este email por que solicitó resturar su contraseña. Si no hiso esta solicitud, por favor, ignore este mensaje.</p>'+

                      '<p style="font-size: 15px; color: #737373; text-align: left; letter-spacing: 0.2px; margin: 0 0 0px; margin-bottom: 20px;">Continue con el proceso dando clic en "Restaurar mi contraseña".</p>'+

                      '<a href="https://www.dintair.com/Dintair/passwordReset/new/procedure/' + token + '\n\n">'+
                        '<button style="width: 250px; padding:5px; background: #1a75ff; border-radius: 4px; color: white; border: 1px solid #1a75ff; outline: none;"> Restaurar mi contraseña </button>'+
                      '</a>'+
                    
                    '</div>'+
                  
                  
                    '<div style="margin-bottom:20px; margin-top:20px; padding-left: 5px; padding-right: 5px;">'+

                      '<h4 style="margin: 0 0 0px; text-align: left; color: #737373; letter-spacing: 0.2px; padding-top: 0px"> Muchas gracias, </h4>'+

                      '<h4 style="margin: 0 0 0px; text-align: left; color: #737373; letter-spacing: 0.2px; padding-top: 10px;"> El equipo de Dintair </h4>'+

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
                  '<div style="margin: 0 auto; text-align: center;">'+
                    '<h4 style="color: #737373; font-size: 10px; letter-spacing: 0.2px;"> Este mensaje se envió a '+
                      '<strong style="color: #33adff; font-size: 10px;">'+user.username+'</strong>'+
                    '.</h4>'+
                  '</div>'+
                '</body>'

          
        };

        /*'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/Everest/passwordReset/new/procedure/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'*/
         
        mailgun.messages().send(data, function (error, body) {
          if(error){
            console.log(error)
          }
            console.log(body);
        });
        //Fin d epara mailgun
        return done(null, false, req.flash('resetMessage', 'Hemos enviado un email a '+ user.username+' con los pasos para que pueda restaurar su contraseña.'))
      }

    ], function(err){
      if(err) return next(err)
        res.redirect('/')
    })
  }),

  app.get('/Dintair/passwordReset/new/procedure/:token', function(req,res){
    User.findOne({resetPasswordToken : req.params.token, resetPasswordExpires : {$gt: Date.now()}}, function(err, user){
      if(!user){
        req.flash('errorr', 'La contraseña es invalida o ha expirado')
        return res.redirect('/Dintair/passwordReset/new')
      }
      res.render('espanol/password_reset_view', {
        token: req.params.token,
        message : req.flash('errorr')
      })
    })
  }),

  app.put('/Dintair/passwordReset/new/procedure/:token', function(req,res){
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
          if(req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function(err) {
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;

              user.save(function(err) {
                req.logIn(user, function(err) {
                  done(err, user);
                });
              });
            })
          } else {
              req.flash("errorr", "Las contraseñas no coinciden");
              return res.redirect('back');
          }
        });
      },
      function(user, done) {
        //Para mailgun
        const content = ''
        var api_key = 'key-d8214dad23cb6f4a0b54f5d346cb3656';
        var domain = 'dintair.com';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
         
        var data = {
          from: 'Dintair <Noreply@dintair.com>',
          to: user.username,
          subject: 'Restauración de contraseña',
          //text: 'Bienvenido a Everest',
          //html: 'Bienvenido a Everest '+ newUser.comp_name
          //html: fs.readFileSync('src/views/espanol/foremails/pass_reset.html', 'utf-8')
          html: '<body style="margin: 0px; padding: 0px; background: hsl(0, 0%, 99%); padding: 0px; text-align: center;"">'+
                  '<div style="text-align: center; width: 100%; margin: 0 auto; max-width: 600px; background: white; padding: 5px; border-bottom: 1px solid #e6e6e6;">'+
                    '<div style="text-align: center; margin-top: 10px; margin-bottom: 10px; margin: 0 auto;">'+
                      '<img style="width: 65px;" src="https://res.cloudinary.com/drdmb9g49/image/upload/v1539535590/Dintair%20images/dintair_iso.png">'+
                    '</div>'+

                    '<div style="padding-left: 5px; padding-right: 5px; padding-bottom: 10px; margin-top: 20px; border-bottom: 1px solid #e6e6e6;">'+
                      '<p style="font-size: 15px; color: #0086b3; font-weight: bold; text-align: left; letter-spacing: 0.2px; margin: 0 0 0px; margin-bottom: 20px;"> Hola,</p>'+
                      '<p style="font-size: 15px; color: #737373; text-align: left; letter-spacing: 0.2px; margin: 0 0 0px; margin-bottom: 20px;">Su contraseña ha sido restaurada exitosamente.</p>'+
                      
                    '</div>'+
                  
                  
                    '<div style="margin-bottom:20px; margin-top:15px; padding-left: 5px; padding-right: 5px;">'+

                      '<h4 style="margin: 0 0 0px; text-align: left; color: #737373; letter-spacing: 0.2px; padding-top: 0px"> Muchas gracias, </h4>'+

                      '<h4 style="margin: 0 0 0px; text-align: left; color: #737373; letter-spacing: 0.2px; padding-top: 10px;"> El equipo de Dintair</h4>'+

                    '</div>'+



                    '<h4 style="color: #737373; font-size: 12px; letter-spacing: 0.2px;"> © Copyright 2018, Dintair all rights reserved </h4>'+
                    '<h4 style="color: #737373; font-size: 10px; letter-spacing: 0.2px;"> Av. El Derby 575, Santiago de Surco, Lima, Perú </h4>'+

                    
                  '</div>'+
                  '<div style="margin: 0 auto; text-align: center;">'+
                    '<h4 style="color: #737373; font-size: 10px; letter-spacing: 0.2px;"> Este mensaje se envió a '+
                      '<strong style="color: #33adff; font-size: 10px;">'+user.username+'</strong>'+
                    '.</h4>'+
                  '</div>'+
                '</body>'
          
        };
         
        mailgun.messages().send(data, function (error, body) {
          if(error){
            console.log(error)
          }
            console.log(body);
        });
        //Fin d epara mailgun
        return done(null, false, req.flash('ConfirmMessage', '¡Este es el último paso! Por favor, ingrese nuevamente su contraseña.'))
      }
    ], function(err) {
      res.redirect('/Dintair/profile/resetPassword/:id');
    });
  }),

  /*FIN DE FORGOT MY PASSWORD*/


  app.get('/Dintair/es/Signin', (req,res) =>{
    res.render('espanol/signin', {
      message : req.flash('loginMessage')
    })
  }),
  app.post('/Dintair/es/Signin', passport.authenticate('local-signin', {

    successRedirect: '/Dintair',
    failureRedirect: '/Dintair/es/Signin',
    failureFlash: true

  })),



  //INICIO DE INTERFAZ DE USUARIO

  //INICIO DE PAG PRINCIPAL

  /*INICIO DE BUSCADO EN PÁGINA PRINCIPAL*/
  
  app.get('/Dintair', isLoggedIn, (req,res) =>{
    var id_adduser = req.params.id
    var iduser = req.params.id

    /*function _publication (data, ids){
        var filter = {creator:{$in: ids}}

        PublicationRecommended.find(filter).populate('creator').exec(function(err, publications){
            if(err){
                res.redirect('/Dintair')
                return
            }

            data.publications = publications.reverse();

            res.render('espanol/forusers/everestuser-recommendation', data);
        });

    }*/
    function _publication (data, ids){
        //var filter = {creator:{$in: ids}}

        PublicationRecommended.find({}).populate('creator').exec(function(err, publications){
            if(err){
                res.redirect('/Dintair')
                return
            }

            data.publications = publications.reverse();

            res.render('espanol/forusers/everestuser-recommendation', data);
        });

    }

    function _like (data, userId){
        var filterLike = {user_id: req.user._id}

        PublicationRecommendedLike.find(filterLike).exec(function(errLike, docLike){
            var countLike = docLike.length;
            var postId = [];

            if(countLike > 0){
                var indexLike = 1;

                docLike.map(function(itemLike){
                    postId.push(itemLike.publication_id.toString());

                    if(indexLike == countLike){
                        data.myLike = postId;

                        _publication(data, userId);
                    }

                    indexLike++;
                });
            } else {
                _publication(data, userId);
            }
        });
    }


    Products.find({creator : req.user._id}).populate('creator').exec(
      function(err, myproducts){
        if(err){
            res.redirect('/Dintair')
            return
        }
        Servicios.find({creator : req.user._id}).populate('creator').exec(
          function(err, myServices){
            if(err){
                res.redirect('/Dintair')
                return
            }

            User.find({}, function(err, usuarios){
              if(err){
                  res.redirect('/Dintair')
                  return
              }


              var filter = {
                  $or: [
                      {user_id: req.user._id},
                      {user_contact_id: mongoose.Types.ObjectId(req.user._id)},
                  ]
              };

              UserRecommended.find(filter).exec(function(err, myContact){
                var userId = [];

                var data = {
                    user: req.user,
                    usuarios: usuarios.reverse(),
                    messwelcome : req.flash('messwelcome'),
                    success : req.flash('success'),
                    editprofile : req.flash('success'),
                    successAmb : req.flash('success'),
                    successeditAMB : req.flash('success'),
                    successIdiom : req.flash('success'),
                    succesPublic : req.flash('success'),
                    succesUsername : req.flash('successUsername'),
                    successPass : req.flash('successPass'),
                    myproducts : myproducts.reverse(),
                    myServices : myServices.reverse(),
                    publications: [],
                    myContact: userId,
                    myLike: []
                }

                userId.push(req.user._id.toString());

                var countMyContact = myContact.length;

                if(countMyContact > 0){
                    var index = 1;

                    myContact.map(function(item){
                        userId.push(item.user_id.toString());

                        if(index == countMyContact){
                            data.myContact = userId;

                            _like(data, userId);
                        }

                        index++;
                    });
                } else {
                    _like(data, userId);
                }
              });
            })
          }
        )
      }
    )
    
  }),

  app.get('/Dintair/publication-post', isLoggedIn, (req,res) =>{
    
    var id_adduser = req.params.id
    var iduser = req.params.id

    function _publication (data, ids){
      var filter = {creator:{$in: ids}}

        Publications.find(filter).populate('creator').exec(function(err, publications){
          if(err){
              res.redirect('/Dintair')
              return
          }

          data.publications = publications.reverse();

          res.render('espanol/forusers/everestuser', data);
        });

    }

    function _like (data, userId){
        var filterLike = {user_id: req.user._id}

        PublicationLike.find(filterLike).exec(function(errLike, docLike){
            var countLike = docLike.length;
            var postId = [];

            if(countLike > 0){
                var indexLike = 1;

                docLike.map(function(itemLike){
                    postId.push(itemLike.publication_id.toString());

                    if(indexLike == countLike){
                        data.myLike = postId;

                        _publication(data, userId);
                    }

                    indexLike++;
                });
            } else {
                _publication(data, userId);
            }
        });
    }


    Products.find({creator : req.user._id}).populate('creator').exec(
      function(err, myproducts){
        if(err){
          res.redirect('/Dintair')
          return
        }
        Servicios.find({creator : req.user._id}).populate('creator').exec(
          function(err, myServices){
            if(err){
              res.redirect('/Dintair')
              return
            }
            User.find({}, function(err, usuarios){
              if(err){
                res.redirect('/Dintair')
                return
              }

              var filter = {
                    $or: [
                        {user_id: req.user._id},
                        {user_contact_id: mongoose.Types.ObjectId(req.user._id)},
                    ]
              };

              UserContact.find(filter).exec(function(err, myContact){
                  var userId = [];

                  var data = {
                      user: req.user,
                      usuarios: usuarios.reverse(),
                      messwelcome : req.flash('messwelcome'),
                      success : req.flash('success'),
                      editprofile : req.flash('success'),
                      successAmb : req.flash('success'),
                      successeditAMB : req.flash('success'),
                      successIdiom : req.flash('success'),
                      succesPublic : req.flash('success'),
                      succesUsername : req.flash('successUsername'),
                      successPass : req.flash('successPass'),
                      myproducts : myproducts.reverse(),
                      myServices : myServices.reverse(),
                      publications: [],
                      myContact: userId,
                      myLike: []
                  }

                  userId.push(req.user._id.toString());

                  var countMyContact = myContact.length;

                  if(countMyContact > 0){
                      var index = 1;

                      myContact.map(function(item){
                          userId.push(item.user_id.toString());

                          if(index == countMyContact){
                              data.myContact = userId;

                              _like(data, userId);
                          }

                          index++;
                      });
                  } else {
                      _like(data, userId);
                  }
              });
            })
          }
        )
      }
    )
  }),



  app.post('/Dintair', isLoggedIn, (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

    //Formato fecha
    var fechaactual = new Date()
    var curr_hour = fechaactual.getHours()-5
    var am_pm_var = (curr_hour < 12) ? 'AM' : 'PM';

    if(curr_hour == 0){
        curr_hour = 12;
    }
    if(curr_hour > 12){
        curr_hour = curr_hour - 12;
    }

    var curr_min = fechaactual.getMinutes();
    var horaactual = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes() + ' : ' + fechaactual.getSeconds());
    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear());

    //Otra fecha
    var gDate = new Date();
    //fecha
    var year = gDate.getFullYear();
    var month = gDate.getMonth()+1;
    var dt = gDate.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    var _date = year+'-' + month + '-'+dt;

    //hour
    var hours = gDate.getHours();
    var minutes = gDate.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;

    var _strTime = hours + ':' + minutes + ' ' + ampm;

    var nh = gDate.getHours();
    var nm = gDate.getMinutes();
    var ns = gDate.getSeconds();

    if(nh < 10){
        nh = '0' + nh;
    }

    if(nm < 10){
        nm = '0' + nm;
    }

    if(ns < 10){
        ns = '0' + ns;
    }

    var createdAt = _date + ' ' + nh + ':' + nm + ':' + ns;

    var publication = {
      estemensaje: req.body.estemensaje,
      imagePublics: req.body.imagePublics,
      
      publicTarget: req.body.publicTarget,
      urldintair: req.body.urldintair,
      urlfacebook: req.body.urlfacebook,
      urlinstagram: req.body.urlinstagram,
      urllinkedin: req.body.urllinkedin,
      creator : req.user._id,
      fecha: tiempoact,
      horaact: horaactual,
      nuevafecha : _strTime,
      created_at: createdAt
    }



    var boxpublications = new Publications(publication);
    var result = {state : 0, msg : 'No se pudo registrar'};
    var files = JSON.parse(req.body.files);

     if(files.length){
         function saveData(newRoute){
             boxpublications.imagePublics = newRoute;
             boxpublications.save(function(err){
                 if(!err){
           

                     result = {
                         state : 1,
                         msg : 'ok',
                         data: {url: '/Dintair'}
                     };
                 } else {
                     result = {state : 0, msg : 'No se registrar los cambios'};
                 }

                 res.send(JSON.stringify(result));
             });
         }

         var count = files.length;
         var index = 0;
         var newRoute = '';

         files.map((item) => {
             var newFile = UploadTavo()._getFile(item);
             var nameFile = UploadTavo()._getRandom(5) + '-' + req.body.id + '.' + newFile.type;
             var routeFile = './uploads/' + nameFile;

             fs.writeFile(routeFile, newFile.data, {encoding: 'base64'}, function(err) {
                 if (err) {
                     console.log('err', err);
                 } else {
                     cloudinary_users.uploader.upload(routeFile, function(result) {
                         newRoute = (newRoute)? newRoute + '---' + result.url : result.url;

                         index++;
                         if(index == count){
                             saveData(newRoute);
                         }
                     })
                 }
             });
         });
    } else {
        boxpublications.save(function(err){
            if(!err){

                result = {
                    state : 1,
                    msg : 'ok',
                    data: {url: '/Dintair'}
                };
            } else {
                result = {state : 0, msg : 'No se pudo registrar los cambios, intentelo mas tarde'};
            }

            res.send(JSON.stringify(result));
        })
    }



  }),

  app.get('/Dintair/Searchss/pages/:page', (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      let perpage = 6
      let page = req.params.page || 1

      var filter = null;

      if(req.query.company && req.query.search){
          filter = {'comp_name' : new RegExp(req.query.search, 'i'), 'rubroTarget' : new RegExp(req.query.company, 'i')};
      } else if(req.query.company){
          filter = {'rubroTarget' : new RegExp(req.query.company, 'i')};
      } else if(req.query.search) {
          filter = {'comp_name' : new RegExp(req.query.search, 'i')};
      }

      User.find(filter).skip((perpage * page) - perpage).limit(perpage).exec(
        (err, usuarios)=>{
            User.count((err,count)=>{
                let result;

                if(err){
                    result = {state : 0, msg : 'Hay problemas'}
                } else {
                    result = {
                        state : 1,
                        usuarios : usuarios.reverse(),
                        current : page,
                        pages : Math.ceil(count / perpage),

                        mensajesbt : mensajesbt.reverse(),
                        messwelcome : req.flash('messwelcome'),
                        success : req.flash('success'),
                        editprofile : req.flash('success'),
                        successAmb : req.flash('success'),
                        successeditAMB : req.flash('success'),
                        successIdiom : req.flash('success'),
                        succesPublic : req.flash('success'),
                        succesUsername : req.flash('successUsername'),
                        successPass : req.flash('successPass'),
                        myproducts : myproducts.reverse(),
                        myServices : myServices.reverse()
                    }
                }

                res.send(JSON.stringify(result));
            })
        }
    );

  }),
  /*FIN DE BUSCADOR EN PÁGINA PRINCIPAL*/

  /* INICIO de Vista de Familiares que decidieron cerrar su cuenta*/
  

  app.get('/Dintair/off/noCatch', isLoggedIn, (req,res)=>{

    res.render('espanol/forDelete/noCatch', {
      user: req.user
    })
  }),
  /*FIN de Vista de Familiares que decidieron cerrar su cuenta*/
  //FIN DE PAG PRINCIPAL



  //INCIO DE PRODUCTOS
  app.get('/Dintair/kindProduct', isLoggedIn, (req,res)=>{

    Products.find({creator : req.user._id}).populate('creator').exec(
      function(err, myproducts){
        if(err){
          res.redirect('/Dintair')
          return
        }
        Servicios.find({creator : req.user._id}).populate('creator').exec(
          function(err, myServices){
            if(err){
              res.redirect('/Dintair')
              return
            }
            res.render('espanol/forusers/products/principalpage', {
              user: req.user,
              myproducts : myproducts.reverse(),
              myServices : myServices.reverse()
            })
          }
        )
      }
    )
  }),


  app.get('/Dintair/products/add/Product', isLoggedIn, (req,res)=>{
    res.render('espanol/forusers/products/formularySteps', {
      user : req.user
    })
  }),


  app.post('/Dintair/products/addmultiple', isLoggedIn,(req, res) =>{
      res.setHeader('Content-Type', 'application/json');

      var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      var fechaactual = new Date()

      //Formato fecha
      var fechaactual = new Date()
      var curr_hour = fechaactual.getHours()-5
      var am_pm_var = (curr_hour < 12) ? 'AM' : 'PM';

      if(curr_hour == 0){
          curr_hour = 12;
      }
      if(curr_hour > 12){
          curr_hour = curr_hour - 12;
      }

      var curr_min = fechaactual.getMinutes();
      var nuevafecha = (curr_hour + " : " + curr_min + " " + am_pm_var);
      var horaactual = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes() + ' : ' + fechaactual.getSeconds());
      var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear());

      var data_products = {
          nombre : req.body.nombre,
          targetsell: req.body.targetsell,
          descripcion : req.body.descripcion,
          procedencia : req.body.procedencia,
          stock : req.body.stock,
          tipo_unidades : req.body.tipo_unidades,
          peso : req.body.peso,
          medida : req.body.medida,
          precio : req.body.precio,
          precio_min : req.body.precio_min,
          cantidad_min : req.body.cantidad_min,
          moneda: req.body.moneda,
          color : req.body.color,
          dimensiones : req.body.dimensiones,
          material : req.body.material,
          fecha: tiempoact,
          horaact: horaactual,
          nuevafecha : nuevafecha,
          creator: req.body.id,
          imgProductos : '/images/img_defectproducts_none-01.jpg',
          deleted : false
      }

      var productos_user = new Products(data_products);
      var result = {state : 0, msg : 'No se pudo registrar'};
      var files = JSON.parse(req.body.files);

       if(files.length){
           function saveData(newRoute){
               productos_user.imgProductos = newRoute;
               productos_user.save(function(err){
                   if(!err){
                       req.flash('messageprod' , 'Producto ' + productos_user.nombre + ' creado')

                       result = {
                           state : 1,
                           msg : 'ok',
                           data: {url: '/Dintair/kindProduct'}
                       };
                   } else {
                       result = {state : 0, msg : 'No se registrar los cambios'};
                   }

                   res.send(JSON.stringify(result));
               });
           }

           var count = files.length;
           var index = 0;
           var newRoute = '';

           files.map((item) => {
               var newFile = UploadTavo()._getFile(item);
               var nameFile = UploadTavo()._getRandom(5) + '-' + req.body.id + '.' + newFile.type;
               var routeFile = './uploads/' + nameFile;

               fs.writeFile(routeFile, newFile.data, {encoding: 'base64'}, function(err) {
                   if (err) {
                       console.log('err', err);
                   } else {
                       cloudinary_users.uploader.upload(routeFile, function(result) {
                           newRoute = (newRoute)? newRoute + '---' + result.url : result.url;

                           index++;
                           if(index == count){
                               saveData(newRoute);
                           }
                       })
                   }
               });
           });
      } else {
          productos_user.save(function(err){
              if(!err){
                  req.flash('messageprod' , 'Producto ' + productos_user.nombre + ' creado')

                  result = {
                      state : 1,
                      msg : 'ok',
                      data: {url: '/Dintair/kindProduct'}
                  };
              } else {
                  result = {state : 0, msg : 'No se pudo registrar los cambios, intentelo mas tarde'};
              }

              res.send(JSON.stringify(result));
          })
      }
  }),

  app.get('/Dintair/products/view/:id', isLoggedIn, (req,res)=>{

    var id_producto = req.params.id
    var token = req.params.token

    Products.findById({'_id': id_producto}, function(err,productos){
      if(err){
        res.redirect('/Dintair/messages')
        return
      }
      var files = '';

      if(productos.imgProductos != '' ){
          files = productos.imgProductos.split('---');

          console.log('mostrando array de files------>');
          console.log(files);
      }

      productos.files = files;

      res.render('espanol/forusers/products/viewproductuser', {
        productos_user: productos, 
        user : req.user
      })
      
    })

  }),
    


  app.get('/Dintair/products/user/view/:id', isLoggedIn, (req,res)=>{

    var id_producto = req.params.id
    var token = req.params.token

    Products.findById({'_id':id_producto}).populate('creator').exec(
      function(err,productos){
        var files = '';

        if(productos.imgProductos != '' ){
            files = productos.imgProductos.split('---');

            console.log('mostrando array de files------>');
            console.log(files);
        }

        productos.files = files;

        res.render('espanol/forusers/products/viewotherproduct', {
          productos_user: productos, 
          user : req.user
        })
      }  
    )

  }),


  app.put('/Dintair/products/addmultiple/:id', isLoggedIn ,(req, res) =>{
      res.setHeader('Content-Type', 'application/json');

      var data_products = {
          nombre : req.body.nombre,
          targetsell: req.body.targetsell,
          descripcion : req.body.descripcion,
          procedencia : req.body.procedencia,
          tipo_unidades : req.body.tipo_unidades,
          stock : req.body.stock,
          peso : req.body.peso,
          medida : req.body.medida,
          moneda: req.body.moneda,
          precio : req.body.precio,
          precio_min : req.body.precio_min,
          cantidad_min : req.body.cantidad_min,
          tipo_unidades_min : req.body.tipo_unidades_min,
          color : req.body.color,
          dimensiones : req.body.dimensiones,
          material : req.body.material,
          imgProductos: req.body.fileOld
      };

      var result = {state : 0, msg : 'No se pudo registrar'};
      var files = JSON.parse(req.body.files);

      if(files.length){
          Products.update({'_id': req.params.id}, data_products, function(productos){
              result = {
                  state : 1,
                  msg : 'ok datos',
                  data: {url: '/Dintair/kindProduct'}
              };
          })

          function saveData(newRoute){
              data_products.imgProductos = newRoute;

              Products.update({'_id': req.params.id}, data_products, function(err){
                  if(!err){
                      req.flash('messageprod' , 'Producto ' + data_products.nombre + ' modificado')

                      result = {
                          state : 1,
                          msg : 'ok',
                          data: {url: '/Dintair/kindProduct'}
                      };
                  } else {
                      result = {state : 0, msg : 'No se registrar los cambios'};
                  }

                  res.send(JSON.stringify(result));
              });
          }

          var count = files.length;
          var index = 0;
          var newRoute = '';

          files.map((item) => {
              var newFile = UploadTavo()._getFile(item);
              var nameFile = UploadTavo()._getRandom(5) + '-' + req.params.id + '.' + newFile.type;
              var routeFile = './uploads/' + nameFile;

              fs.writeFile(routeFile, newFile.data, {encoding: 'base64'}, function(err) {
                  if (err) {
                      console.log('err', err);
                  } else {
                      cloudinary_users.uploader.upload(routeFile, function(result) {
                          newRoute = (newRoute)? newRoute + '---' + result.url : result.url;

                          index++;
                          if(index == count){
                              newRoute = (req.body.fileOld)? req.body.fileOld + '---' + newRoute : newRoute;

                              saveData(newRoute);
                          }
                      })
                  }
              });
          });
      } else {
          Products.update({'_id': req.params.id}, data_products, function(err){
              if(!err){
                  req.flash('messageprod' , 'Producto ' + data_products.nombre + ' modificado')

                  result = {
                      state : 1,
                      msg : 'ok',
                      data: {url: '/Dintair/kindProduct'}
                  };
              } else {
                  result = {state : 0, msg : 'No se pudo modificar los cambios, intentelo mas tarde'};
              }

              res.send(JSON.stringify(result));
          })
      }
  }),

  app.get('/Dintair/products/edit/:id', isLoggedIn, function(req,res){
    var id_producto = req.params.id
    
    Products.findById({'_id': id_producto}, function(err, producto){

      var files = '';

      if(producto.imgProductos != '' ){
          files = producto.imgProductos.split('---');
      }

      producto.files = files;

      res.render('espanol/forusers/products/editproduser', {
        productos_user: producto, 
        user : req.user
      })
    })
  }),



  app.put('/Dintair/products/view/delete/:id/:nombre', isLoggedIn, function(req,res){
    var id_producto = req.params.id

    var username = req.params.username

    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto",
      "Septiembre","Octubre","Noviembre","Diciembre")
    var fechaactual = new Date()
    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear())
    //Formato fecha
    var am_pm_var = ""

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

    var data_products = {
      deleted : true,
      deleteDate : tiempoact,
      deleteTime : nuevafecha
    }

    Products.update({'_id': id_producto}, data_products,function(err){
      if(!err){
        res.redirect('/Dintair/kindProduct')
        return
      } else {
        console.log(err)
        res.redirect('/Dintair')
      }
    })
  }),
  //FIN DE PRODUCTOS

  //INICIO DE SERVICIOS
  app.get('/Dintair/services/add/Service', isLoggedIn, (req,res)=>{
    res.render('espanol/forusers/services/formularySteps', {
      user: req.user
    })
  }),

  app.post('/Dintair/services/addmultiple', isLoggedIn, (req,res)=>{
      res.setHeader('Content-Type', 'application/json');

      var iduser = req.body.id
      var fecha = dateformat(fechaactual, 'yyyy-mm-dd')
      var fecha_hora = dateformat(fechaactual, 'yyyy-mm-dd h:MM:ss')
      //Formato fecha
      var am_pm_var = ""
      var fechaactual = new Date()
      var curr_hour = fechaactual.getHours()-5

      if(curr_hour < 12){
          am_pm_var = 'AM'
      } else {
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

      //fechas
      var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto", "Septiembre","Octubre","Noviembre","Diciembre")
      var fechaactual = new Date()
      var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear())
      var horaactual = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes() + ' : ' + fechaactual.getSeconds())

      var data_servicios = {
          name_serv : req.body.name_serv,
          targetsell: req.body.targetsell,
          tipo_serv : req.body.tipo_serv,
          desc_serv : req.body.desc_serv,
          origin_serv : req.body.origin_serv,
          especialidades_serv : req.body.especialidades_serv,
          hora_creacion : horaactual,
          fecha_creacion : tiempoact,
          nuevafecha : nuevafecha,

          //time
          hora_apertura : req.body.horainicio,
          hora_cierre : req.body.horafinal,
          dia_aper : req.body.dia_i,
          dia_cierr : req.body.dia_f,

          imageServicios : '/images/img_defect_services-01.jpg',
          creator: iduser,
          deleted : false
      }

      var data_serv = new Servicios(data_servicios)
      var result = {state : 0, msg : 'No se pudo registrar'};
      var files = JSON.parse(req.body.files);

      if(files.length){
          function saveData(newRoute){
              data_serv.imageServicios = newRoute;
              data_serv.save(function(err){
                  if(!err){
                      req.flash('messageprod' , 'Servicio ' + data_serv.name_serv + ', creado')

                      result = {
                          state : 1,
                          msg : 'ok',
                          data: {url: '/Dintair/kindProduct'}
                      };
                  } else {
                      result = {state : 0, msg : 'No se registrar los cambios'};
                  }

                  res.send(JSON.stringify(result));
              });
          }

          var count = files.length;
          var index = 0;
          var newRoute = '';

          files.map((item) => {
              var newFile = UploadTavo()._getFile(item);
              var nameFile = UploadTavo()._getRandom(5) + '-' + req.body.id + '.' + newFile.type;
              var routeFile = './uploads/' + nameFile;

              fs.writeFile(routeFile, newFile.data, {encoding: 'base64'}, function(err) {
                  if (err) {
                      console.log('err', err);
                  } else {
                      cloudinary_users.uploader.upload(routeFile, function(result) {
                          newRoute = (newRoute)? newRoute + '---' + result.url : result.url;

                          index++;
                          if(index == count){
                              saveData(newRoute);
                          }
                      })
                  }
              });
          });
      } else {
          data_serv.save(function(err){
              if(!err){
                  req.flash('messageprod' , 'Servicio ' + data_serv.name_serv + ', creado')

                  result = {
                      state : 1,
                      msg : 'ok',
                      data: {url: '/Dintair/kindProduct'}
                  };
              } else {
                  result = {state : 0, msg : 'No se pudo registrar los cambios, intentelo mas tarde'};
              }

              res.send(JSON.stringify(result));
          })

      }
  }),

  app.get('/Dintair/services/view/:id', isLoggedIn, (req,res)=>{
    var id_services = req.params.id

    Servicios.findById({'_id': id_services}, function(err, servicios){
      if(err){
        res.redirect('/Dintair/messages')
        return
      }

      var files = '';

      if(servicios.imageServicios != '' ){
          files = servicios.imageServicios.split('---');
      }

      servicios.files = files;

      res.render('espanol/forusers/services/viewserviceuser', {
        data_serv: servicios, 
        user : req.user
      })
      
    })
  }),

  app.get('/Dintair/services/user/view/:id', isLoggedIn, (req,res)=>{
    var id_services = req.params.id

    Servicios.findByIdAndUpdate(req.params.id, {$inc: {vistas: 1}}, function(err, servicios){
      
      if(err){
        res.redirect('/Dintair/messages')
        return
      }
      var files = '';

      if(servicios.imageServicios != '' ){
          files = servicios.imageServicios.split('---');
      }

      servicios.files = files;

      res.render('espanol/forusers/services/viewotherserviceuser', {
        data_serv: servicios, 
        user : req.user
      })
    })
  }),

  app.get('/Dintair/services/edit/:id', isLoggedIn, (req,res)=>{
    var id_services = req.params.id

    Servicios.findById({'_id': id_services}, function(err,servicios){
      var files = '';

      if(servicios.imageServicios != '' ){
          files = servicios.imageServicios.split('---');
      }

      servicios.files = files;

      res.render('espanol/forusers/services/editserviceuser', {
        data_serv: servicios, 
        user : req.user
      })
    })
  }),

  app.put('/Dintair/services/addmultiple/:id', isLoggedIn, (req,res)=>{
      res.setHeader('Content-Type', 'application/json');

      var data_serv_user = {
          name_serv : req.body.name_serv,
          targetsell: req.body.targetsell,
          tipo_serv : req.body.tipo_serv,
          desc_serv : req.body.desc_serv,
          origin_serv : req.body.origin_serv,
          especialidades_serv : req.body.especialidades_serv,
          imageServicios: req.body.fileOld,
          //time
          hora_apertura : req.body.horainicio,
          hora_cierre : req.body.horafinal,
          dia_aper : req.body.dia_i,
          dia_cierr : req.body.dia_f
      }

      var result = {state : 0, msg : 'No se pudo registrar'};
      var files = JSON.parse(req.body.files);

      if(files.length){
          Servicios.update({'_id': req.params.id}, data_serv_user, function(servicios){
              result = {
                  state : 1,
                  msg : 'ok datos',
                  data: {url: '/Dintair/kindProduct'}
              };
          })

          function saveData(newRoute){
              data_serv_user.imageServicios = newRoute;

              Servicios.update({'_id': req.params.id}, data_serv_user, function(err){
                  if(!err){
                      req.flash('messageprod' , 'Servicio ' + data_serv_user.name_serv + ' modificado')

                      result = {
                          state : 1,
                          msg : 'ok',
                          data: {url: '/Dintair/kindProduct'}
                      };
                  } else {
                      result = {state : 0, msg : 'No se registrar los cambios'};
                  }

                  res.send(JSON.stringify(result));
              });
          }

          var count = files.length;
          var index = 0;
          var newRoute = '';

          files.map((item) => {
              var newFile = UploadTavo()._getFile(item);
              var nameFile = UploadTavo()._getRandom(5) + '-' + req.params.id + '.' + newFile.type;
              var routeFile = './uploads/' + nameFile;

              fs.writeFile(routeFile, newFile.data, {encoding: 'base64'}, function(err) {
                  if (err) {
                      console.log('err', err);
                  } else {
                      cloudinary_users.uploader.upload(routeFile, function(result) {
                          newRoute = (newRoute)? newRoute + '---' + result.url : result.url;

                          index++;
                          if(index == count){
                            newRoute = (req.body.fileOld)? req.body.fileOld + '---' + newRoute : newRoute;

                            saveData(newRoute);
                          }
                      })
                  }
              });
          });

      } else {
          Servicios.update({'_id': req.params.id}, data_serv_user, function(err){
              if(!err){
                  req.flash('messageprod' , 'Servicio ' + data_serv_user.name_serv + ' modificado')

                  result = {
                    state : 1,
                    msg : 'ok',
                    data: {url: '/Dintair/kindProduct'}
                  };
              } else {
                  result = {state : 0, msg : 'No se pudo modificar los cambios, intentelo mas tarde'};
              }

              res.send(JSON.stringify(result));
          })

      }

  }),


  app.put('/Dintair/services/view/delete/:id/:nombre', isLoggedIn, function(req,res){
    var id_services = req.params.id

    var username = req.params.username 

    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto",
      "Septiembre","Octubre","Noviembre","Diciembre")
    var fechaactual = new Date()
    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear())
    //Formato fecha
    var am_pm_var = ""

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

    var data_servicios = {
      deleted : true,
      deleteDate : tiempoact,
      deleteTime : nuevafecha
    }

    Servicios.update({'_id': id_services}, data_servicios, function(err){
      if(!err){
        res.redirect('/Dintair/kindProduct')
        return
      } else {
        console.log(err)
        res.redirect('/Dintair/kindProduct')
      }
    })
  }),
  //FIN DE SERVICIOS





  //INICIO DE PERFIL DE USUSAIRO
  app.get('/Dintair/profile/user', isLoggedIn, (req,res)=>{

    function _like (data, userId){
        var filterLike = {user_id: req.user._id}

        PublicationRecommendedLike.find(filterLike).exec(function(errLike, docLike){
            var countLike = docLike.length;
            var postId = [];

            if(countLike > 0){
                var indexLike = 1;

                docLike.map(function(itemLike){
                    postId.push(itemLike.publication_id.toString());

                    if(indexLike == countLike){
                        data.myLike = postId;

                        _publication(data, userId);
                    }

                    indexLike++;
                });
            } else {
                _publication(data, userId);
            }
        });
    }
    
    Publications.find({creator: req.user._id}).populate('creator').exec(
      function(err, publics){
        if(err){
          res.redirect('/Dintair')
          return
        }
        Ambassador.find({creator : req.user._id}).populate('creator').exec(
          function(err, ambassador){
            if(err){
              res.redirect('/Dintair')
              return
            }
            Products.find({creator : req.user._id}).populate('creator').exec(
              function(err, myproducts){
                if(err){
                  res.redirect('/Dintair/spaceS/:page/pages')
                  return
                }
                Servicios.find({creator : req.user._id}).populate('creator').exec(
                  function(err, myServices){
                    if(err){
                      res.redirect('/Dintair/spaceS/:page/pages')
                      return
                    }
                    UserContact.find({user_contact_id : req.user._id}).populate('user_id').exec(
                      function(err, followers){
                        if(err){
                          res.redirect('/Dintair')
                          return
                        }
                        UserContact.count({user_contact_id:req.user._id}).populate('user_contact_id').exec(
                          function(err, followers_count){
                            if(err){
                              res.redirect('/Dintair')
                              return
                            }
                            Sugerencia.find({}, function(err, sugerencias){
                              if(err){
                                res.redirect('/Dintair')
                                return
                              }
                              PublicationRecommended.find({creator: req.user._id}).populate('creator').exec(function(err, publications){
                                if(err){
                                    res.redirect('/Dintair')
                                    return
                                }

                                var dataFinal = {
                                    user : req.user,
                                    publics : publics.reverse(),
                                    successPass : req.flash('successPass'),
                                    deletePublic : req.flash('deletePublic'),
                                    ambassador : ambassador,
                                    myproducts : myproducts.reverse(),
                                    myServices : myServices.reverse(),
                                    followers : followers,
                                    followers_count : followers_count,
                                    successedit: req.flash('success'),
                                    sucessamb: req.flash('successamb'),
                                    sugerencias:sugerencias.reverse(),
                                    myLike : [],
                                    publications:publications.reverse(),
                                    places: []
                                }

                                var filterUserMap = {user_id: mongoose.Types.ObjectId(req.user._id)};

                                UserMap.find(filterUserMap).exec(function(errUserMap, docUserMap){
                                    if(!errUserMap){
                                        if(docUserMap.length){
                                            var countUserMap  = docUserMap.length;
                                            var indexUserMap  = 1;
                                            var places        = [];

                                            docUserMap.map((itemUserMap) => {
                                                places.push({
                                                    lat:itemUserMap.lat,
                                                    lng:itemUserMap.lng,
                                                    title:itemUserMap.title,
                                                });

                                                if(indexUserMap == countUserMap){
                                                    dataFinal.places = places;

                                                    res.render('espanol/forusers/users/pageprofuser', dataFinal);
                                                }

                                                indexUserMap++;
                                            });
                                        } else {
                                            res.render('espanol/forusers/users/pageprofuser', dataFinal);
                                        }

                                    } else {
                                        res.render('espanol/forusers/users/pageprofuser', dataFinal);
                                    }

                                });
                              })
                            })
                          }
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        )
          
      }
    )
      
  }),
  /*INICIO DE FOTO DE PERFIL*/
  app.put('/Dintair/picture/:id', isLoggedIn, upload.single('imgperfil'), (req,res)=>{
    var data_user = {
      
    }
    const path = require('path')

    console.log(req.file)

    //EDITAR SIN IMAGEN Y CON IMAGEN
    if(req.file){

      cloudinary_users.uploader.upload(req.file.path,
        function(result){
          data_user.imageProfile = result.url
          User.update({'_id': req.params.id}, data_user, function(usuarios){
            res.redirect('/Dintair/profile/user')
          })
        }
      )
      
    } else {
        
      User.update({'_id': req.params.id}, data_user, function(usuarios){
        res.redirect('/Dintair/profile/user')
      })  
    }
  }),
  /*FIN DE FOTO DE PERFIL*/

  /*INICIO DE FOTO DE MARKET*/
  app.put('/Dintair/picture/market/:id', isLoggedIn, upload.single('imageMarket'), (req,res)=>{
    var data_user = {
      
    }
    const path = require('path')

    console.log(req.file)

    //EDITAR SIN IMAGEN Y CON IMAGEN
    if(req.file){

      cloudinary_users.uploader.upload(req.file.path,
        function(result){
          data_user.imageMarket = result.url
          User.update({'_id': req.params.id}, data_user, function(usuarios){
            res.redirect('/Dintair/profile/user')
          })
        }
      )
      
    } else {
        
      User.update({'_id': req.params.id}, data_user, function(usuarios){
        res.redirect('/Dintair/profile/user')
      })  
    }
  }),
  /*FIN DE FOTO DE MARKET*/

  //PARA CAMBIO DE FOTO DE PORTADA
  app.put('/Dintair/profile/user/:id/:comp_name', isLoggedIn, upload.single('imagePortada'),(req,res)=>{
    var data_portada = {
        imagePortadaCrop: ''
    }

    const path = require('path')
    console.log(req.file)

    //EDITAR SIN IMAGEN Y CON IMAGEN
    if(req.file){


      cloudinary_users.uploader.upload(req.file.path,
          function(result){
              data_portada.imagePortada = result.url;
          }
      )

      //----inicio upload image
      if(req.body.imagePortadaCrop){
          var file = req.body.imagePortadaCrop;
          var newRoute = '';
          var newFile = UploadTavo()._getFile(file);
          var nameFile = UploadTavo()._getRandom(5) + '-' + req.params.id + '.' + newFile.type;
          var routeFile = './uploads/' + nameFile;

          fs.writeFile(routeFile, newFile.data, {encoding: 'base64'}, function(err) {
              if (err) {
                  console.log('err', err);
              } else {
                  //subiendo al servidor
                  cloudinary_users.uploader.upload(routeFile, function(result) {
                      data_portada.imagePortada = result.url

                      User.update({'_id': req.params.id}, data_portada, function(usuarios){
                          res.redirect('back')
                      })
                  })
              }
          });
      } else {
          User.update({'_id': req.params.id}, data_portada, function(usuarios){
              res.redirect('back')
          })
      }
      //----fin upload image
      
    } else {
        
      User.update({'_id': req.params.id}, data_portada, function(usuarios){
        res.redirect('back')
      })     
    }
  }),

  
  //Inicio de formularios después de registro
  app.get('/Dintair/preview/register', isLoggedIn, (req,res)=>{
    var id_usuario = req.user.id

    User.findById({'_id': id_usuario}).populate('_id').exec(
      function(err, usuario){
        if(err){
          res.redirect('/Dintair/es/Signup')
          return
        }
        res.render('espanol/preview',{
          user: req.user,
          newUser: usuario
        })
      }
    )
  }),
  app.put('/Dintair/profile/UltData/:id', isLoggedIn, (req,res)=>{


    User.find({}).exec( function(err, doc){
      if(!err){
        var data_user = {

          //dato principal
          wtpnumber : req.body.wtpnumber,
          iam : req.body.iam,
          rubroTarget : req.body.rubroTarget,
          country : req.body.country,
          provincia : req.body.provincia,
          id_url : doc.length + 1
        }

        const path = require('path')

        console.log(req.file)

        
        User.update({'_id': req.params.id}, data_user, function(usuarios){
          res.redirect('/Dintair')
        })
      } else {
          console.log('no actualizo');
      }
    })
  }),
  //Fin de formularios después de registro




  

  app.put('/Dintair/profile/user/:id', isLoggedIn, upload.single('imgperfil'), (req,res)=>{
    var data_user = {
      //dato principal
      rubroTarget : req.body.rubroTarget,
      comp_dedicacion: req.body.comp_dedicacion,
      comp_name: req.body.comp_name,
      comp_inicios: req.body.comp_inicios,
      comp_mision: req.body.comp_mision,
      comp_vision: req.body.comp_vision,
      //country: req.body.country,
      skills_comp : req.body.skills_comp,
      cant_trabajadores_comp : req.body.cant_trabajadores_comp,
      //dato adicional
      face_page : req.body.face_page,
      urlFace : req.body.urlFace,
      pagina_web: req.body.pagina_web,
      sede: req.body.sede,
      direccion: req.body.direccion,
      iam : req.body.iam,
      //otros
      dia: req.body.dia,
      mes: req.body.mes,
      ano: req.body.ano,
      wtpnumber: req.body.wtpnumber
    }

    const path = require('path')

    console.log(req.file)

    //EDITAR SIN IMAGEN Y CON IMAGEN
    if(req.file){

      cloudinary_users.uploader.upload(req.file.path,
        function(result){
          data_user.imageProfile = result.url
          User.update({'_id': req.params.id}, data_user, function(usuarios){
            req.flash('success', 'Sus datos se han editado correctamente')
            res.redirect('/Dintair/profile/user')
          })

          /*INICIO DE MYSQL

          var con = mysql.createConnection({
            host:"localhost",
            port:"3306",
            user:"root",
            password:"ariados",
            database:"dintairDB"
          });

          var userName = req.param('username');
          console.log(userName)

          var newUserMysql = new Object();
          newUserMysql.skills_comp = req.param('skills_comp');
          newUserMysql.comp_name = req.param('comp_name');
          newUserMysql.rubroTarget = req.param('rubroTarget');


          con.connect(function(err){
            if(err) throw err;
            console.log("Connected!")

            con.query("UPDATE users SET ? WHERE ?", [newUserMysql,{username:userName}],function(err, rows, fields){
              if(err) throw err;

              console.log('Datos actualizados')
            })
          })

          FIN DE MYSQL*/
        }
      )
      
    } else {
        
      User.update({'_id': req.params.id}, data_user, function(usuarios){
        req.flash('success', 'Sus datos se han editado correctamente')
        res.redirect('/Dintair/profile/user')
      })

      /*INICIO DE MYSQL

      var con = mysql.createConnection({
        host:"localhost",
        port:"3306",
        user:"root",
        password:"ariados",
        database:"dintairDB"
      });

      var userName = req.param('username');
      console.log(userName)

      var newUserMysql = new Object();
      newUserMysql.skills_comp = req.param('skills_comp');
      newUserMysql.comp_name = req.param('comp_name');
      newUserMysql.rubroTarget = req.param('rubroTarget');


      con.connect(function(err){
        if(err) throw err;
        console.log("Connected!")

        con.query("UPDATE users SET ? WHERE ?", [newUserMysql,{username:userName}],function(err, rows, fields){
          if(err) throw err;

          console.log('Datos actualizados')
        })
      })

      FIN DE MYSQL*/
          
    }
    
  }),



  app.get('/Dintair/username/updating', isLoggedIn, (req,res)=>{
    var iduser = req.params.id

    User.findById({'_id': iduser}, function(err, usernameDintair){
      res.render('espanol/forusers/users/username/username_edit', { 
        user : req.user,
        resetMessage : req.flash('resetMessage')
      })
    })
  }),

  app.put('/Dintair/profile/username/:id/:username', isLoggedIn, (req,res)=>{

    async.waterfall([
      
      function(token, done){


        User.findOne({'username' : req.body.username}, function(err, user){
          if(user){
            req.flash('resetMessage', 'El correo electrónico ya esta en uso')
            return res.redirect('/Dintair/username/updating');
          }



          else{
            var data_user = {
              username: req.body.username
            }

            const path = require('path')
                
            User.update({'_id': req.params.id}, data_user, function(usuarios){


              //Para mailgun
              const content = ''
              var api_key = 'key-d8214dad23cb6f4a0b54f5d346cb3656';
              var domain = 'dintair.com';
              var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
               
              var data = {
                from: 'Dintair <notifications@dintair.com>',
                to: data_user.username,
                subject: 'Cambio de correo electrónico',
                //text: suggests.comp_name+' te ha enviado una sugerencia.',
                html: '<body style="margin: 0px; padding: 0px; padding: 0px; text-align: center;">'+


                        '<div style="text-align: center; width: 100%; margin: 0 auto; max-width: 600px; background-color: hsl(0, 0%, 98%); padding: 15px; border-bottom: 1px solid #e6e6e6;">'+
                          
                          '<img src="https://res.cloudinary.com/drdmb9g49/image/upload/v1539535844/Dintair%20images/dintair_isoName.png", style="width: 200px;">'+

                          '<p style="text-align: left; font-size: 16px; padding-top: 5px; padding-bottom: 2px; color: #404040"> Hola, </p>'+
                          '<p style="text-align: left; font-size: 16px; padding-top: 0px; padding-bottom: 2px; color: #404040">Ha cambiado su correo electrónico exitosamente. Desde ahora podrá ingresar a su cuenta de Dintair con: '+ 
                            '<strong style="color: #33adff; font-size: 16px;">'+data_user.username+'</strong>'+ 
                          '.</p>'+


                          '<div style="margin-bottom:20px; margin-top:20px; padding-left: 5px; padding-right: 5px;">'+

                            '<h4 style="margin: 0 0 0px; text-align: left; color: #737373; letter-spacing: 0.2px; padding-top: 0px"> Muchas gracias, </h4>'+

                            '<h4 style="margin: 0 0 0px; text-align: left; color: #737373; letter-spacing: 0.2px; padding-top: 10px;">El equipo de Dintair</h4>'+

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

                        '<div style="margin: 0 auto; text-align: center;">'+
                          '<h4 style="color: #737373; font-size: 10px; letter-spacing: 0.2px;"> Este mensaje se envió a '+
                            '<strong style="color: #33adff; font-size: 10px;">'+data_user.username+'</strong>'+
                          '.</h4>'+
                        '</div>'+
                    '</body>'
              };
               
              mailgun.messages().send(data, function (error, body) {
                if(error){
                  console.log(error)
                }
                  console.log(body);
              });
              //Fin d epara mailgun

              req.flash('successUsername', 'Ha establecido su nuevo correo electrónico exitosamente.')
              res.redirect('/Dintair/profile/user')
            })
          }
        })
      }
    ])
  }),




  app.get('/Dintair/profile/user/edit', isLoggedIn, function(req,res){
    var iduser = req.user._id
    
    User.findById({'_id': iduser}, function(err, usuario){
      res.render('espanol/forusers/users/editpageforuser', { 
        user : req.user
      })
    })
  }),


  app.get('/Dintair/profile/resetPassword/:id', isLoggedIn, (req,res)=>{
    var idUser = req.params.id

    User.findById({'_id': idUser}, function(err, userPass){
      res.render('espanol/forusers/users/reset_pass', {
        user : req.user,
        messageError : req.flash('errorr'),
        messageReset : req.flash('ConfirmMessage')
        
      })
    })
  }),

  app.put('/Dintair/profile/resetPassword/:id', isLoggedIn, (req,res)=>{
    
    var password = req.body.password

    var data_user = {
      password : bcrypt.hashSync(password)
    }

  

    if(req.body.password === req.body.confirm){
      User.update({'_id': req.params.id}, data_user, function(usuarios){
        req.flash('successPass', 'Ha cambiado su contraseña correctamente')
        res.redirect('/Dintair/profile/user')
        console.log('Contraseña cambiada')
      })  
    } else {
        req.flash("errorr", "Las contraseñas no coinciden");
        return res.redirect('back');
    }
    
  }),


  /*INICIO DE DELETE PERFIL*/

  app.get('/Dintair/profile/procedure/DELETE/:id/:comp_name/:username', isLoggedIn, (req,res)=>{

    res.render('espanol/forusers/users/deleteAccount', {
      user: req.user
    })
  }),


  app.delete('/Dintair/profile/DELETE/:id/:comp_name/:username/:fecha_signup', isLoggedIn, (req,res)=>{

    var username = req.params.username 

    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto",
      "Septiembre","Octubre","Noviembre","Diciembre")
    var fechaactual = new Date()
    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear())
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


    var data_user = {
      //imagenes
      //dato principal

      username : username + '_DELETED' +nuevafecha,

      deleted : true,
      deletedDate : tiempoact,
      deletedTime : nuevafecha,
      deleteWhy : req.body.deleteWhy,
      deleteDescription : req.body.deleteDescription
    }

    console.log(data_user)

    //EDITAR SIN IMAGEN Y CON IMAGE

 

     
    User.update({'_id': req.params.id}, data_user, function(usuarios){
      res.redirect('/endaccount')
    })
        
  }),

  app.get('/Dintair/see/you/later/dintair', function(err,res){
    res.render('espanol/forDelete/goodbye')
  }),
  /*FIN DE DELETE PERFIL*/

  /*INICIO DE VISTA DE CONTACTOS AGREGADOS Y SEGUIDORES*/
  app.get('/Dintair/contacts/f&f', isLoggedIn, (req,res)=>{
    UserContact.find({user_contact_id : req.user._id}).populate('user_id').exec(
      function(err, followers){
        if(err){
          res.redirect('/Dintair')
          return
        }
        console.log(req.user._id)  

        UserContact.count({user_contact_id:req.user._id}).populate('user_contact_id').exec(
          function(err, followers_count){
            if(err){
              res.redirect('/Dintair')
              return
            }
            console.log(req.user._id)         

            res.render('espanol/forusers/users/contacts/follow_ers', {
              user : req.user,
              followers : followers.reverse(),
              followers_count:followers_count
            })
          }
        )
      }
    )
  }),
  /*FIN DE VISTA DE CONTACTOS AGREGADOS Y SEGUIDORES*/


  /*INICIO DE EDITOR DE EMBAJADOR*/

  app.get('/Dintair/profile/Ambassador', isLoggedIn, (req,res)=>{
    
    res.render('espanol/forusers/users/Ambassador/createAmbassador', {
      user: req.user
    })
  }),

  app.post('/Dintair/profile/Ambassador', upload.single('ambassadorIMGs'), isLoggedIn, (req,res)=>{
    var iduser = req.body.id
    
    var fecha = dateformat(fechaactual, 'yyyy-mm-dd')
    var fecha_hora = dateformat(fechaactual, 'yyyy-mm-dd h:MM:ss')

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

    //fechas
    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto",
      "Septiembre","Octubre","Noviembre","Diciembre")
    var fechaactual = new Date() 
    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear())
    var horaactual = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes() + ' : ' + fechaactual.getSeconds())

    /*Primer nombre*/
    var fullName = req.body.nameAmb;
    console.log(fullName)
    var splitName = fullName.split(' ');
    var NameColect = [];
    var FirstNameAm = splitName[0];
    console.log(FirstNameAm)
    /*Fin de primer nombre*/

    var data_ambassador = {
      nameAmb : req.body.nameAmb,
      dia_1 : req.body.dia_1,
      mes_1 : req.body.mes_1,
      año_1 : req.body.año_1,
      country_Amb : req.body.country_Amb,
      cargoAmb : req.body.cargoAmb,
      funcionAmb : req.body.funcionAmb,
      numAmb : req.body.numAmb,
      wtpNumAmb : req.body.wtpNumAmb,
      emailAmb : req.body.emailAmb,
      hobbiesAmb : req.body.hobbiesAmb,
      creator : iduser,
      ambassadorIMGs : '/images/profile.png',

      fecha: tiempoact,
      horaact : horaactual,
      nuevafecha : nuevafecha,

      creationDate : fechaactual,
      shortName : FirstNameAm


    }

    var embajador_data = new Ambassador(data_ambassador)

    console.log(req.file)
    //EDITAR SIN IMAGEN Y CON IMAGEN
    if(req.file){

      cloudinary_users.uploader.upload(req.file.path,
        function(result){
          embajador_data.ambassadorIMGs = result.url
          embajador_data.save(function(err){
            if(!err){
             req.flash('successamb', '¡Felicidades, '+embajador_data.nameAmb+' es el nuevo Representante!')
              res.redirect('/Dintair')
            } else {
              
              console.log(embajador_data)
              res.render('/Dintair/services/add')
            }
          })
        }
      )
      
    } else {
        
      embajador_data.save(function(err){
        if(!err){
          req.flash('successamb', '¡Felicidades, '+embajador_data.nameAmb+' es el nuevo Representante!')
          res.redirect('/Dintair/profile/user')
        } else {
          
          console.log(embajador_data)
          res.render('/Dintair/services/add')
        }
      })
          
    }
  }),


  app.get('/Dintair/profile/Ambassador/Edit/:id/:nameAmb', isLoggedIn, (req,res)=>{
    Ambassador.findById({'_id': req.params.id}).populate('creator').exec(
      function(err, ambdata){
        if(err){
          res.redirect('/Dintair')
          return
        }
        res.render('espanol/forusers/users/Ambassador/editAmbassador', {
          user: req.user,
          embajador_data : ambdata
        })
      }
    )
  }),

  app.put('/Dintair/profile/Ambassador/Edit/:id/:nameAmb', isLoggedIn, upload.single('ambassadorIMGs'), (req,res)=>{
    
    var fecha = dateformat(fechaactual, 'yyyy-mm-dd')
    var fecha_hora = dateformat(fechaactual, 'yyyy-mm-dd h:MM:ss')

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

    //fechas
    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto",
      "Septiembre","Octubre","Noviembre","Diciembre")
    var fechaactual = new Date() 
    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear())
    var horaactual = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes() + ' : ' + fechaactual.getSeconds())


    /*Primer nombre*/
    var fullName = req.body.nameAmb;
    console.log(fullName)
    var splitName = fullName.split(' ');
    var NameColect = [];
    var FirstNameAm = splitName[0];
    console.log(FirstNameAm)
    /*Fin de primer nombre*/


    var data_ambassador = {
      nameAmb : req.body.nameAmb,
      shortName : FirstNameAm,
      dia_1 : req.body.dia_1,
      mes_1 : req.body.mes_1,
      año_1 : req.body.año_1,
      country_Amb : req.body.country_Amb,

      cargoAmb : req.body.cargoAmb,
      funcionAmb : req.body.funcionAmb,
      numAmb : req.body.numAmb,
      wtpNumAmb : req.body.wtpNumAmb,
      emailAmb : req.body.emailAmb,
      hobbiesAmb : req.body.hobbiesAmb,

      fecha: tiempoact,
      horaact : horaactual,
      nuevafecha : nuevafecha,

      creationDate : fechaactual


    }

    const path = require('path')

    console.log(req.file)



    //EDITAR SIN IMAGEN Y CON IMAGEN
    if(req.file){

      cloudinary_users.uploader.upload(req.file.path,
        function(result){
          data_ambassador.ambassadorIMGs = result.url
          Ambassador.update({'_id': req.params.id}, data_ambassador, function(ambassador){
            req.flash('successamb', 'Los datos del Representante se han editado correctamente')
            res.redirect('/Dintair/profile/user')
          })
        }
      )
      
    } else {
        
      Ambassador.update({'_id': req.params.id}, data_ambassador, function(ambassador){
        req.flash('successamb', 'Los datos del Representante se han editado correctamente')
        res.redirect('/Dintair/profile/user')
      })
          
    }
  }),

  /*FIN DE EDITOR DE EMABJADOR*/  



  //FIN DE PERFIL DE USUARIO

  //INICIO DE BUSCADOR

  app.get('/Dintair/Search/:page', isLoggedIn, (req,res) =>{

    if(req.query.search){

      let perpage = 6
      let page = req.params.page || 1

      const regex = new RegExp(escapeRegex(req.query.search), 'gi');

      //comp_name: regex

      User
        .find({comp_name : regex})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec(
          (err, usuarios)=>{
            User.count((err, count)=>{
              if(err){
                console.log(err)
              }
              var noMatch;
              if(usuarios.length <1){
                noMatch = 'No hay una empresa registrada con ese nombre o similar.'
              }
              res.render('espanol/forusers/search/buscadoruser', {
                user: req.user,
                usuarios : usuarios.reverse(),
                noMatch: noMatch,
                current : page,
                pages : Math.ceil(count / perpage)
              })
            })
          }
        )
        
    } else {

      let perpage = 6
      let page = req.params.page || 1

      User.find({}).skip((perpage * page) - perpage).limit(perpage).exec(
          (err, usuarios)=>{
            User.count((err,count)=>{
              if(err){
                return next(err)
              }
              res.render('espanol/forusers/search/buscadoruser', {
                user: req.user,
                usuarios: usuarios.reverse(),
                current : page,
                pages : Math.ceil(count / perpage)
              })
            })
          }
        )

    }
  }),

  app.get('/Dintair/Searchss/:page', (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      let perpage = 6
      let page = req.params.page || 1

      var filter = null;

      if(req.query.company && req.query.search){
          filter = {'comp_name' : new RegExp(req.query.search, 'i'), 'rubroTarget' : new RegExp(req.query.company, 'i')};
      } else if(req.query.company){
          filter = {'rubroTarget' : new RegExp(req.query.company, 'i')};
      } else if(req.query.search) {
          filter = {'comp_name' : new RegExp(req.query.search, 'i')};
      }

      User
          .find(filter)
          .skip((perpage * page) - perpage)
          .limit(perpage)
          .exec(
              (err, usuarios)=>{
                  User.count((err,count)=>{
                      let result;

                      if(err){
                          result = {state : 0, msg : 'Hay problemas'}
                      } else {
                          result = {
                              state : 1,
                              usuarios : usuarios.reverse(),
                              current : page,
                              pages : Math.ceil(count / perpage)
                          }
                      }

                      res.send(JSON.stringify(result));
                  })
              }
          );

  }),
  

  app.get('/Dintair/:id', isLoggedIn, (req,res)=>{
    var iduser = req.params.id
    var id_user = req.user._id
    var perPage = 6

    User.findByIdAndUpdate(req.params.id, {$inc: {vistas:1}}, function(err, usuario){
      if(err){
        res.redirect('/Dintair/Search')
        return
      }
      Products.find({creator: iduser}).populate('creator').exec(
        function(err, allproducto){
          if(err){
            res.redirect('/Dintair/Search')
            return
          }
          Servicios.find({creator: iduser}).populate('creator').exec(

            function(err, allservices){
              if(err){
                res.redirect('/Dintair/Search')
                return
              }
              Ambassador.find({creator : iduser}).populate('creator').exec(
                function(err, Ambuser){
                  if(err){
                    res.redirect('/Dintair/Search')
                    return
                  }
                  UserContact.find({user_contact_id : iduser}).populate('user_id').exec(
                    function(err, followers){
                      if(err){
                        res.redirect('/Dintair')
                        return
                      }
                      UserContact.count({user_contact_id:iduser}).populate('user_contact_id').exec(
                        function(err, followers_count){
                          if(err){
                            res.redirect('/Dintair')
                            return
                          }

                          var filterContact = {user_id:id_user, user_contact_id: mongoose.Types.ObjectId(iduser)};

                          UserContact.find(filterContact).exec(function(errContact, docContact){
                            var following = (docContact.length)?  1 : 0 ;

                            var dataFinal = {
                                user: req.user,
                                newUser: usuario,
                                allproducto: allproducto.reverse(),
                                allservices : allservices,
                                Ambuser : Ambuser,
                                following : following,
                                followers_count : followers_count,
                                followers : followers,
                                places: []
                            }

                            var filterUserMap = {user_id: mongoose.Types.ObjectId(iduser)};

                            UserMap.find(filterUserMap).exec(function(errUserMap, docUserMap){
                                if(!errUserMap){
                                    if(docUserMap.length){
                                        var countUserMap  = docUserMap.length;
                                        var indexUserMap  = 1;
                                        var places        = [];

                                        docUserMap.map((itemUserMap) => {
                                            places.push({
                                                lat:itemUserMap.lat,
                                                lng:itemUserMap.lng,
                                                title:itemUserMap.title,
                                            });

                                            if(indexUserMap == countUserMap){
                                                dataFinal.places = places;

                                                res.render('espanol/forusers/users/viewotheruser', dataFinal);
                                            }

                                            indexUserMap++;
                                        });
                                    } else {
                                        res.render('espanol/forusers/users/viewotheruser', dataFinal);
                                    }

                                } else {
                                    res.render('espanol/forusers/users/viewotheruser', dataFinal);
                                }

                            });

                          });
                        }
                      )
                    }
                  )
                }
              ) 
            }    
          )
        }
      )
    })
  }),

  /*inicio de enviar email*/
  app.post('/Dintair/contact/email', isLoggedIn, (req,res)=>{
    var id_user = req.body.id

    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto",
      "Septiembre","Octubre","Noviembre","Diciembre")

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

    var horaactual = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes() + ' : ' + fechaactual.getSeconds())
    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear())
    var fecha = (fechaactual.getDate()+'/'+meses[fechaactual.getMonth()]+'/'+fechaactual.getFullYear())

    var emailForUser = {
      comp_name : req.user.comp_name,
      myemail: req.user.username,
      targetemail:req.body.email,
      full_name : req.body.full_name,
      subject : req.body.subject,
      message : req.body.message,
      fecha_act : fecha,
      fecha : tiempoact,
      fecha_hora : horaactual,
      nuevafecha : nuevafecha,
      creator : id_user,
      status : false
    }

    var emailcontactar = new emailContact(emailForUser)
 

    emailcontactar.save(function(err){

      //Para mailgun
      const content = ''
      var api_key = 'key-d8214dad23cb6f4a0b54f5d346cb3656';
      var domain = 'dintair.com';
      var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
       
      var data = {
        from: emailcontactar.myemail,
        to: emailcontactar.targetemail,
        subject: emailcontactar.subject,
        html: '<body style="margin: 0px; padding: 0px; background: white; padding: 0px; text-align: center;">'+
                '<div style="text-align: center; margin-top: 10px; margin-bottom: 10px; margin: 0 auto;">'+
                  '<img style="width: 65px;" src="https://res.cloudinary.com/drdmb9g49/image/upload/v1539535590/Dintair%20images/dintair_iso.png">'+
                '</div>'+

                '<div style="text-align: center; width: 100%; margin: 0 auto; max-width: 600px; background: white; padding: 5px; border-bottom: 1px solid #2d5986;">'+
                  '<p style="text-align: left; font-size: 16px; padding-top: 10px; padding-bottom: 10px; color: #404040">'+emailcontactar.full_name+', haz recibido un mensaje de '+emailcontactar.comp_name+':</p>'+
                  '<p style="text-align: left; font-size: 16px; padding-top: 10px; padding-bottom: 10px; color: #737373">'+emailcontactar.message+'</p>'+
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

                '<h4 style="color: #737373; font-size: 12px; letter-spacing: 0.2px;"> © Copyright 2019, Dintair all rights reserved </h4>'+
                '<h4 style="color: #737373; font-size: 10px; letter-spacing: 0.2px;"> Av. El Derby 575, Santiago de Surco, Lima, Perú </h4>'+
    
              '</body>'
      };
       
      mailgun.messages().send(data, function (error, body) {
        if(error){
          console.log(error)
        }
          console.log(body);
      });
      //Fin d epara mailgun

      if(!err){
        //req.flash('success', 'Mensaje enviado correctamente')
        res.redirect('/Dintair')
      } else {
        res.render('/Dintair')
        console.log('Sugerencia no enviada')
      }
    })
  }),
  /*fin de enviar email*/

  app.get('/Dintair/products/view/user/:id/:nombre', isLoggedIn, (req,res)=>{

    var id_producto = req.params.id
    var token = req.params.token

    Products.findByIdAndUpdate(req.params.id, {$inc: {vistas: 1}}, function(err,productos){

      console.log(productos);

      var files = '';

      if(productos.imgProductos != '' ){
          files = productos.imgProductos.split('---');

          console.log('mostrando array de files------>');
          console.log(files);
      }

      productos.files = files;

      res.render('espanol/forusers/products/viewproductuser', {
        productos_user: productos, 
        user : req.user
      })
      
    })

  }),

  //FIN DE BUSCADOR

  //INICIO DE SUGERENCIAS

  app.get('/Dintair/contact/us', isLoggedIn, (req,res)=>{

    Ambassador.find({creator : req.user._id}).populate('creator').exec(
      function(err, ambassador){
        if(err){
          res.redirect('/Dintair')
          return
        }
        res.render('espanol/forusers/suggestions/contactus', {
          user:req.user,
          success : req.flash('success'),
          ambassador : ambassador
        })
      }
    )
  }),

  app.post('/Dintair/suggestions', isLoggedIn, (req,res)=>{
    var id_user = req.body.id
    var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto",
      "Septiembre","Octubre","Noviembre","Diciembre")

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

    var horaactual = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes() + ' : ' + fechaactual.getSeconds())
    var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear())
    var fecha = (fechaactual.getDate()+'/'+meses[fechaactual.getMonth()]+'/'+fechaactual.getFullYear())

    var sugerencia = {
      comp_name : req.user.comp_name,
      select_type : req.body.select_type,
      text_suggest : req.body.text_suggest,
      fecha_act : fecha,
      fecha : tiempoact,
      fecha_hora : horaactual,
      nuevafecha : nuevafecha,
      username : req.body.username,
      creator : id_user,

      status : false
    }

    var suggests = new Sugerencia(sugerencia)
 

    suggests.save(function(err){

      if(!err){
        req.flash('success', 'Mensaje enviado correctamente')
        res.redirect('/Dintair/contact/us')
        console.log(suggests)
      } else {
        res.render('/Dintair/contact/us')
        console.log('Sugerencia no enviada')
      }
    })

  }),

  //FIN DE SUGERENCIAS


  //INICIO DE NOTICIAS
  app.get('/Dintair/start/Newsbook', isLoggedIn, (req, res, next)=>{

    News.find({}, function(err, allNews){ 
      if(err){
        return next(err)
      }
      NewsWeek.find({}, function(err, weeknews){
        if(err){
          res.redirect('/Dintair')
          return
        }
        res.render('espanol/forusers/News/index', {
          user : req.user,
          allNews : allNews.reverse(),
          weeknews : weeknews
        })
      })
    })
  }),

  app.get('/Dintair/Newsbook/selectNews/:id', isLoggedIn, (req,res)=>{

    var idnews = req.params.id

    News.findById({'_id' : idnews}, function(err, showNews){
      if(err){
        res.redirect('/Dintair')
        return
      }
      res.render('espanol/forusers/News/showNews', {
        user : req.user,
        dataNews : showNews
      })
    })
  }),

  app.get('/Dintair/Newsbook/selectNews/Week/:id', isLoggedIn, (req,res)=>{
    var idnews = req.params.id

    NewsWeek.findById({'_id': idnews}, function(err, showWeek){
      if(err){
        res.redirect('/Dintair')
        return
      }
      res.render('espanol/forusers/News/showWeek', {
        user : req.user,
        dataNewsS : showWeek
      })
    })
  }),

  app.get('/Dintair/Newsbook/select/Feriadex', isLoggedIn, (req,res)=>{
    News.find({}, function(err, allNews){
      if(err){
        res.redirect('/')
        return
      }
      res.render('espanol/forusers/News/feriadex', {
        user: req.user,
        allNews : allNews.reverse()
      })
    })
  }),

  app.get('/Dintair/Newsbook/select/districts', isLoggedIn, (req,res)=>{
    News.find({}, function(err, allNews){
      if(err){
        res.redirect('/')
        return
      }
      res.render('espanol/forusers/News/districts', {
        user: req.user,
        allNews : allNews.reverse()
      })
    })
  }),

  app.get('/Dintair/Newsbook/select/feriaJockey/navJockey', isLoggedIn, (req,res)=>{
    News.find({}, function(err, allNews){
      if(err){
        res.redirect('/')
        return
      }
      res.render('espanol/forusers/News/navJockey', {
        user: req.user,
        allNews : allNews.reverse()
      })
    })
  }),

  app.get('/Dintair/Newsbook/select/ExpoProveedores', isLoggedIn, (req,res)=>{
    News.find({}, function(err, allNews){
      if(err){
        res.redirect('/')
        return
      }
      res.render('espanol/forusers/News/ExpoProveedores', {
        user:req.user,
        allNews : allNews.reverse()
      })
    })
  }),
  //FIN DE NOTICIAS




  /*INICIO DE RECOMENDACIONES PARA EMPRESARIOS*/
  app.get('/Dintair/recommendations/board', isLoggedIn, (req,res)=>{
    Products.find({creator : req.user._id}).populate('creator').exec(
      function(err, myproducts){
        if(err){
          res.redirect('/Dintair')
          return
        }
        Servicios.find({creator : req.user._id}).populate('creator').exec(
          function(err, myServices){
            if(err){
              res.redirect('/Dintair')
              return
            }
            res.render('espanol/forusers/recommendations/principal_page', {
              user: req.user,
              myproducts : myproducts.reverse(),
              myServices : myServices.reverse()
            })
          }
        )
      }
    )
  }),

  app.get('/Dintair/dashboard/myBox/product/:id', isLoggedIn, (req,res)=>{
    var id_producto = req.params.id
    var token = req.params.token

    Products.findById(req.params.id, function(err,productos){ 
    
      var files = '';

      if(productos.imgProductos != '' ){
          files = productos.imgProductos.split('---');

          console.log('mostrando array de files------>');
          console.log(files);
      }

      productos.files = files;

      res.render('espanol/forusers/recommendations/productos/show_clients', {
        productos_user: productos, 
        user : req.user
      })
    })
  }),

  app.get('/Dintair/create/publication', isLoggedIn, (req,res)=>{
      function _publication(recommended, ids){
          var data = {
              user: req.user,
              recommended : recommended,
              publications: []
          }

          console.log(data);

          var filter = {creator:{$in: ids}}

          PublicationRecommended.find(filter).populate('creator').exec(function(err, publications){
              if(!err){
                  data.publications = publications.reverse();
              }

              res.render('espanol/forusers/recommendations/createpublication/view', data)
          });
      }

      var filter = {
          $or: [
              {user_id: req.user._id},
              {user_contact_id: mongoose.Types.ObjectId(req.user._id)},
          ]
      };

      UserRecommended.find(filter).populate('user_contact_id').exec(function(err, doc) {
          var userId = [];
          var recommended = [];

          userId.push(req.user._id.toString());

          var count = (doc.length > 0) ? parseInt(doc.length) - 1 : doc.length;

          if(count > 0){
              doc.map(function(item, index){
                  userId.push(item.user_contact_id._id.toString());
                  recommended.push({
                      _id: item.user_contact_id._id,
                      comp_name: item.user_contact_id.comp_name,
                      representative: item.user_contact_id.full_name + ' ' + item.user_contact_id.first_name,
                      imageProfile : item.user_contact_id.imageProfile
                  });

                  if(index == count){
                      _publication(recommended, userId);
                  }
              });
          } else {
              _publication(recommended, userId);
          }
      });
  }),
  app.post('/Dintair/create/publication', isLoggedIn, (req,res)=>{
      res.setHeader('Content-Type', 'application/json');
      var meses = new Array('Enero', "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      var fechaactual = new Date()

      //Formato fecha
      var fechaactual = new Date()
      var curr_hour = fechaactual.getHours()-5
      var am_pm_var = (curr_hour < 12) ? 'AM' : 'PM';

      if(curr_hour == 0){
          curr_hour = 12;
      }

      if(curr_hour > 12){
          curr_hour = curr_hour - 12;
      }

      var curr_min = fechaactual.getMinutes();
      var nuevafecha = (curr_hour + " : " + curr_min + " " + am_pm_var);
      var horaactual = (fechaactual.getHours() + ' : ' + fechaactual.getMinutes() + ' : ' + fechaactual.getSeconds());
      var tiempoact= (fechaactual.getDate() + ' de ' + meses[fechaactual.getMonth()] + ' de ' + fechaactual.getFullYear());


      var gDate = new Date();

      //fecha
      var year = gDate.getFullYear();
      var month = gDate.getMonth()+1;
      var dt = gDate.getDate();

      if (dt < 10) {
          dt = '0' + dt;
      }
      if (month < 10) {
          month = '0' + month;
      }

      var _date = year+'-' + month + '-'+dt;

      var nh = gDate.getHours();
      var nm = gDate.getMinutes();
      var ns = gDate.getSeconds();

      if(nh < 10){
          nh = '0' + nh;
      }

      if(nm < 10){
          nm = '0' + nm;
      }

      if(ns < 10){
          ns = '0' + ns;
      }

      var createdAt = _date + ' ' + nh + ':' + nm + ':' + ns;


      var publication = {
          estemensaje: req.body.estemensaje,
          imagePublics: req.body.imagePublics,
          //publicTarget: req.body.publicTarget,
          urldintair: req.body.urldintair,
          urlfacebook: req.body.urlfacebook,
          urlinstagram: req.body.urlinstagram,
          urllinkedin: req.body.urllinkedin,
          creator : req.user._id,
          fecha: tiempoact,
          horaact: horaactual,
          nuevafecha : nuevafecha,
          created_at: createdAt
      }


      var boxpublications = new PublicationRecommended(publication);
      var result = {state : 0, msg : 'No se pudo registrar'};
      var files = JSON.parse(req.body.files);

      if(files.length){
          function saveData(newRoute){
              var result = {state : 0, msg : 'No se pudo registrar'};

              boxpublications.imagePublics = newRoute;
              boxpublications.save(function(err){
                  if(!err){
                      var filter = {user_id: req.user._id};

                      UserRecommendedTemp.find(filter).exec( function(err, doc){
                          var countDoc = (doc.length > 0)? parseInt(doc.length) - 1 : doc.length;

                          if(countDoc){
                              doc.map((item, index) => {
                                  var data = {
                                      user_id: req.user._id,
                                      user_contact_id: item.user_contact_id
                                  }

                                  UserRecommended.find(data).exec(function (errExists, docExists){
                                      if(!docExists.length){
                                          var Recommended = new UserRecommended(data)

                                          //mUserRecommended.save(function(err){
                                          Recommended.save(function(err){
                                              if(!err){
                                                  result = {
                                                      state : 1,
                                                      msg : 'ok',
                                                      data: {url: '/Dintair'}
                                                  };
                                              }
                                          });
                                      } else {
                                          result = {
                                              state : 1,
                                              msg : 'ok',
                                              data: {url: '/Dintair'}
                                          };
                                      }

                                      if(countDoc == index){
                                          return res.send(JSON.stringify(result));
                                      }
                                  });
                              });
                          } else {
                              result = {
                                  state : 1,
                                  msg : 'ok',
                                  data: {url: '/Dintair'}
                              };

                              return res.send(JSON.stringify(result));
                          }
                      })
                  } else {
                      result = {state : 0, msg : 'No se registrar los cambios'};

                      return res.send(JSON.stringify(result));
                  }
              });
          }

          var count = files.length;
          var index = 0;
          var newRoute = '';

          files.map((item) => {
              var newFile = UploadTavo()._getFile(item);
              var nameFile = UploadTavo()._getRandom(5) + '-' + req.body.id + '.' + newFile.type;
              var routeFile = './uploads/' + nameFile;

              fs.writeFile(routeFile, newFile.data, {encoding: 'base64'}, function(err) {
                  if (err) {
                      console.log('err', err);
                  } else {
                      cloudinary_users.uploader.upload(routeFile, function(result) {
                          newRoute = (newRoute)? newRoute + '---' + result.url : result.url;

                          index++;
                          if(index == count){
                              saveData(newRoute);
                          }
                      })
                  }
              });
          });
      } else {
          boxpublications.save(function(err){
              if(!err){

                  result = {
                      state : 1,
                      msg : 'ok',
                      data: {url: '/Dintair'}
                  };
              } else {
                  result = {state : 0, msg : 'No se pudo registrar los cambios, intentelo mas tarde'};
              }

              res.send(JSON.stringify(result));
          })
      }
  }),
  app.post('/Dintair/create/publication/progress-prev', isLoggedIn, (req,res)=>{
      res.setHeader('Content-Type', 'application/json');

      UserRecommendedTemp.remove({ user_id: req.user._id }, function(err) {
          if (!err) {
              console.log('se borro correctamente');
          } else {
              console.log('no se pudo borrar');
          }
      });

      //cantidad de lista
      var list = JSON.parse(req.body.list);

      if(list.length){
          list.map((item, index) => {
              var data = {
                  user_id: req.user._id,
                  user_contact_id: item
              }

              var mUserRecommendedTemp = new UserRecommendedTemp(data)

              mUserRecommendedTemp.save(function(err){
                  if(!err){
                      console.log('saved');
                  } else {
                      console.log('no gravo aqui');
                  }
              });
          });
      }

      var result = {
          state: 1,
          msg: 'Se guardaron los datos correctamente!',
          data: {url: '/Dintair'}
      }

      return res.send(JSON.stringify(result))
  }),


  /*INICIO DE EDICION DE PUBLICACIÓN*/
  app.get('/Dintair/make/public/edition/:id', isLoggedIn, (req,res)=>{

    var id_publication = req.params.id

    PublicationRecommended.findById({'_id': id_publication}, function(err,publication){
      if(err){
        res.redirect('/Dintair')
        return
      }
      var files = '';

      if(publication.imagePublics != undefined ){
          files = publication.imagePublics.split('---');
      }

      publication.files = files;

      res.render('espanol/forusers/recommendations/edition/public_edition', {
        boxpublications: publication, 
        user : req.user
      })
    })
  }),
  app.put('/Dintair/make/public/edition/:id', isLoggedIn, (req,res)=>{
    res.setHeader('Content-Type', 'application/json');

    var gDate = new Date();

    //fecha
    var year = gDate.getFullYear();
    var month = gDate.getMonth()+1;
    var dt = gDate.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    var _date = year+'-' + month + '-'+dt;

    var nh = gDate.getHours();
    var nm = gDate.getMinutes();
    var ns = gDate.getSeconds();

    if(nh < 10){
        nh = '0' + nh;
    }

    if(nm < 10){
        nm = '0' + nm;
    }

    if(ns < 10){
        ns = '0' + ns;
    }

    var createdAt = _date + ' ' + nh + ':' + nm + ':' + ns;

    var publication = {
        estemensaje: req.body.estemensaje,
        //publicTarget: req.body.publicTarget,
        urldintair: req.body.urldintair,
        urlfacebook: req.body.urlfacebook,
        urlinstagram: req.body.urlinstagram,
        urllinkedin: req.body.urllinkedin,
        imagePublics: req.body.fileOld,
        created_at: createdAt
    }

    var result = {state : 0, msg : 'No se pudo registrar'};
    var files = JSON.parse(req.body.files);

    if(files.length){
      PublicationRecommended.update({'_id': req.params.id}, publication, function(publicationRecom){
        result = {
          state : 1,
          msg : 'ok datos',
          data: {url: '/Dintair'}
        };
      })

      function saveData(newRoute){
          publication.imagePublics = newRoute;

          PublicationRecommended.update({'_id': req.params.id}, publication, function(err){
            if(!err){
                result = {
                    state : 1,
                    msg : 'ok',
                    data: {url: '/Dintair'}
                };
            } else {
                result = {state : 0, msg : 'No se registraron los cambios'};
            }

            res.send(JSON.stringify(result));
          });
      }

      var count = files.length;
      var index = 0;
      var newRoute = '';

      files.map((item) => {
        var newFile = UploadTavo()._getFile(item);
        var nameFile = UploadTavo()._getRandom(5) + '-' + req.params.id + '.' + newFile.type;
        var routeFile = './uploads/' + nameFile;

        fs.writeFile(routeFile, newFile.data, {encoding: 'base64'}, function(err) {
            if (err) {
                console.log('err', err);
            } else {
                cloudinary_users.uploader.upload(routeFile, function(result) {
                    newRoute = (newRoute)? newRoute + '---' + result.url : result.url;

                    index++;
                    if(index == count){
                        newRoute = (req.body.fileOld)? req.body.fileOld + '---' + newRoute : newRoute;
                        saveData(newRoute);
                    }
                })
            }
        });
      });
    } else {
      PublicationRecommended.update({'_id': req.params.id}, publication, function(err){
          if(!err){
            result = {
                state : 1,
                msg : 'ok',
                data: {url: '/Dintair'}
            };
          } else {
              result = {state : 0, msg : 'No se pudo modificar los cambios, intentelo mas tarde'};
          }

          res.send(JSON.stringify(result));
      })
    }
  }),
  /*FIN DE EDICIÓN DE PUBLICACIÓN*/

  app.get('/Dintair/dashboard/myBox/service/:id', isLoggedIn, (req,res)=>{


     Servicios.findById(req.params.id, function(err,servicios){
    
      var files = '';

      if(servicios.imageServicios != '' ){
          files = servicios.imageServicios.split('---');

          console.log('mostrando array de files------>');
          console.log(files);
      }

      servicios.files = files;

      res.render('espanol/forusers/recommendations/servicios/show_clients', {
        data_serv: servicios,
        user : req.user
      })
    })
  }),

  app.get('/Platform/recommendation-search/:page', isLoggedIn, (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var perpage = 12
    var page = req.params.page || 1    
    var filter = {'creator' : req.user._id, 'deleted': false};

    Products.find(filter).exec( function(err, docProduct){      
      if(docProduct){
        var count = docProduct.length;
        var index = 0;
        var _gItem = [];

        docProduct.map(function(gItem){
            var _recommended = recommended.getItem(gItem.targetsell);
            _gItem = _gItem.concat(_recommended);

            index++;

            if(index == count){
              _gItem = _gItem.filter(tool.onlyUnique)

              var filterUser = {'_id':{$nin:[req.user._id]}, 'rubroTarget' : _gItem, 'deleted': false};

              User.find(filterUser).skip((perpage * page) - perpage).limit(perpage).exec(  
                function(err, doc){
                  if(err){
                    var result = {
                      state: 0,
                      msg: 'No se pudo traer los usuarios!',
                      data: {}
                    }
          
                    res.send(JSON.stringify(result))
                  } else {
                    var result = {
                      state: 1,
                      msg: 'ok!',
                      data: doc
                    }
                
                    res.send(JSON.stringify(result))
                  }
                }
              )
            }
        })

      } else {
        var result = {
          state: 0,
          msg: 'No se pudo traer los usuarios!',
          data: {}
        }

        res.send(JSON.stringify(result))
      }
    })
    
  }),

  /*Servicios*/
  app.get('/Platform/service/recommendation-search/:page', isLoggedIn, (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var perpage = 12
    var page = req.params.page || 1    
    var filter = {'creator' : req.user._id, 'deleted': false};

    Servicios.find(filter).exec( function(err, docServicios){      
      if(docServicios){
        var count = docServicios.length;
        var index = 0;
        var _gItem = [];

        docServicios.map(function(gItem){
            var _recommended = recommended.getItem(gItem.targetsell);
            _gItem = _gItem.concat(_recommended);

            index++;

            if(index == count){
              _gItem = _gItem.filter(tool.onlyUnique)

              var filterUser = {'_id':{$nin:[req.user._id]}, 'rubroTarget' : _gItem, 'deleted': false};

              User.find(filterUser).skip((perpage * page) - perpage).limit(perpage).exec(  
                function(err, doc){
                  if(err){
                    var result = {
                      state: 0,
                      msg: 'No se pudo traer los usuarios!',
                      data: {}
                    }
          
                    res.send(JSON.stringify(result))
                  } else {
                    var result = {
                      state: 1,
                      msg: 'ok!',
                      data: doc
                    }
                
                    res.send(JSON.stringify(result))
                  }
                }
              )
            }
        })

      } else {
        var result = {
          state: 0,
          msg: 'No se pudo traer los usuarios!',
          data: {}
        }

        res.send(JSON.stringify(result))
      }
    })
    
  }),
  /*Fin de servicios*/

  app.post('/Platform/recommendation-email', isLoggedIn, (req, res) => {
    recommendedEmail.remove({ user_id: req.user._id }, function(err) {
      if (!err) {
        console.log('se borro correctamente');
      } else {
        console.log('no se pudo borrar');
      }
    });
    
    var data = {
      imageProfile : req.body.imageProfile,
      comp_name : req.body.comp_name,
      user_id: req.user._id,
      email : req.body.email,
      representative : req.body.representative
    }

    recommendedEmail.create(data, function (err, doc) {
      if(doc){
        var result = {
          state: 1,
          msg: 'Se guardaron los datos correctamente!',
          data: doc
        }

        res.send(JSON.stringify(result))
      } else {
        var result = {
          state: 0,
          msg: 'No se pudo traer los usuarios!',
          data: {}
        }

        res.send(JSON.stringify(result))
      }

    })
    
  }),
  /*Fin de Recommend*/
  /*FIN DE RECOMENDACIONES PARA EMPRPESARIOS*/


  //busqueda en el header
  app.post('/Dintair/search-header', (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      //productos
      
      var filter = {
        'nombre' : new RegExp(req.body.search, "i"),
        'deleted': false
      }; // ----> /value/i

      console.log(filter);

      switch(req.body.type) {
          case 'product':
              var filter = {
                  'nombre' : new RegExp(req.body.search, "i"),
                  'deleted': false
              }; // ----> /value/i

              Products.find(filter).limit(5).exec( function(err, docProduct){
                  if(docProduct){
                      var result = {
                          state: 1,
                          msg: 'ok!',
                          data: docProduct
                      }

                      console.log(docProduct);

                      res.send(JSON.stringify(result));
                  } else {
                      var result = {
                          state: 0,
                          msg: 'No se pudo traer los productos!',
                          data: {}
                      }

                      res.send(JSON.stringify(result));
                  }
              })

              break;

          case 'business':
              var filter = {
                  'comp_name' : new RegExp(req.body.search, "i"),
                  'deleted': false
              }; // ----> /value/i

              User.find(filter).limit(5).exec( function(err, doc){
                  if(doc){
                      var result = {
                          state: 1,
                          msg: 'ok!',
                          data: doc
                      }

                      console.log(doc);

                      res.send(JSON.stringify(result));
                  } else {
                      var result = {
                          state: 0,
                          msg: 'No se pudo traer las empresas!',
                          data: {}
                      }

                      res.send(JSON.stringify(result));
                  }
              })

              break;
          default:

      }


  }),

  //chat
  app.get('/Platform/chat', isLoggedIn, (req,res)=>{
      res.render('espanol/forusers/chat/index', {
          user : req.user,
          user_id: ''
      })
  }),

  app.get('/Platform/chat/:user_id', isLoggedIn, (req,res)=>{
      res.render('espanol/forusers/chat/index', {
          user : req.user,
          user_id: req.params.user_id
      })
  }),

  //iniciando chat con el cliente
  app.post('/Platform/chat-link', isLoggedIn, (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      var result = {state : 0, msg : 'No se registrar los cambios'};

      function search(){
          var chatId = tool.gDateTime();
          chatId = chatId.replace(/-/g, '');
          chatId = chatId.replace(/ /g, '');
          chatId = chatId.replace(/:/g, '');

          var userId = [req.user._id, req.body.user_id];
          var countUserId = userId.length;
          var index = 0;

          for(var i = 0; i < countUserId; i++){
              var data = {
                  chat_id: chatId,
                  user_id: userId[i],
                  msg: 'es  un mensaje de prueba',
                  state: 0,
                  create_at: Date
              };

              var mUserChat = new UserChat(data);

              mUserChat.save(function(err, doc){
                  if(!err){
                      index++;

                      if(index == countUserId){
                          result = {
                              state : 1,
                              msg : 'ok',
                              data: {
                                  url: '/Platform/chat/' + req.body.user_id,
                                  chat_id: chatId
                              }
                          };

                          return res.send(JSON.stringify(result));
                      }

                  } else {
                      result = {state : 0, msg : 'No se registrar los cambios'};

                      return res.send(JSON.stringify(result));
                  }
              });

          }
      }

      var filterExist = {user_id: req.body.user_id}

      UserChat.find(filterExist).exec( function(err, doc){
          if(doc) {
              var index = 0;
              var exist = 0;
              var countExist = doc.length;
              var chatId = 0;

              if (doc.length) {
                  doc.map(function (item) {
                      var filterExistTwo = {chat_id: item.chat_id, user_id: req.user._id}

                      UserChat.find(filterExistTwo).exec(function (err, docTwo) {
                          index++;

                          if (docTwo) {
                              exist++;
                              chatId = item.chat_id;
                          }

                          if (index == countExist) {
                              if (exist == 0) {
                                  return search();
                              } else {
                                  result = {
                                      state: 1,
                                      msg: 'ya existe un registro de chat',
                                      data: {
                                          url: '/Platform/chat/' + req.body.user_id,
                                          chat_id: chatId
                                      }
                                  };

                                  return res.send(JSON.stringify(result));
                              }
                          }
                      });

                  });
              } else {
                  return search();
              }

          }
      });

  }),

  app.get('/Platform/chat-business', isLoggedIn, (req,res)=>{
      res.setHeader('Content-Type', 'application/json');

      var filter = [
          { $match : { user_id: mongoose.Types.ObjectId(req.user._id) } },
          {$group:{_id:"$chat_id" }}
      ];

      UserChat.aggregate(filter).exec( function(err, doc){
          if(doc.length){
              var count = doc.length
              count = (count > 0)? count - 1 : 0;
              var gId = [];

              doc.map(function (item, index) {
                  gId.push(item._id);//chat_id

                  if(count == index){
                      var filterHeader = {
                          'chat_id' : {$in: gId},
                          "user_id": {"$ne": mongoose.Types.ObjectId(req.user._id)}, //not
                      };

                      //funciona bien con datos o no datos en el detalle
                      UserChat.find(filterHeader).populate('user_id').exec( function(errHeader, docHeader){
                          if(docHeader){
                              var nBusinessHeader = [];
                              var countHeader = parseInt(docHeader.length) - 1

                              docHeader.map(function(itemHeader, indexHeader){
                                  var gItemHeader = itemHeader.user_id._id.toString();

                                  nBusinessHeader[gItemHeader] = {
                                      chat_id: itemHeader.chat_id,
                                      user_id: itemHeader.user_id._id,
                                      user_doc: {
                                          _id: itemHeader.user_id._id,
                                          comp_name: itemHeader.user_id.comp_name,
                                          imageProfile: itemHeader.user_id.imageProfile,
                                          representante: itemHeader.user_id.full_name
                                      },
                                      notification: 0
                                  }

                                  if(indexHeader == countHeader){
                                      UserChatDetail.find(filterHeader).populate('user_id').exec( function(errDetail, docDetail){
                                          if(docDetail.length){
                                              var countBusiness = parseInt(docDetail.length) - 1;
                                              var notification = [];

                                              docDetail.map(function(itemDetail, indexDedail){
                                                  var gItem = itemDetail.user_id._id.toString();

                                                  if(itemDetail.state_alert == 0){
                                                      if(notification[gItem]){
                                                          var alert = parseInt(notification[gItem].alert) + 1;
                                                          notification[gItem] = {alert: alert};
                                                      } else {
                                                          notification[gItem] = {alert: 1}
                                                      }

                                                      nBusinessHeader[gItem].notification = notification[gItem].alert;
                                                  }

                                                  if(indexDedail == countBusiness){
                                                      var dFinal = [];
                                                      var indexFinal = 0;
                                                      var keys = Object.keys(nBusinessHeader);

                                                      keys.map(function(itemFinal){
                                                          dFinal[indexFinal] = nBusinessHeader[itemFinal];

                                                          if(countHeader == indexFinal){
                                                              var result = {
                                                                  state: 1,
                                                                  msg: 'ok',
                                                                  data: dFinal
                                                              }

                                                              return res.send(JSON.stringify(result));
                                                          }

                                                          indexFinal++;
                                                      });
                                                  }
                                              });
                                          } else {
                                              var dFinal = [];
                                              var indexFinal = 0;
                                              var keys = Object.keys(nBusinessHeader);

                                              keys.map(function(itemFinal){
                                                  dFinal[indexFinal] = nBusinessHeader[itemFinal];

                                                  if(countHeader == indexFinal){
                                                      var result = {
                                                          state: 1,
                                                          msg: 'ok',
                                                          data: dFinal
                                                      }

                                                      return res.send(JSON.stringify(result));
                                                  }

                                                  indexFinal++;
                                              });
                                          }
                                      });

                                  }
                              });
                          } else {
                              var result = {
                                  state: 1,
                                  msg: 'No se pudo encontrar - segunda instancia!',
                                  data: {}
                              }

                              return res.send(JSON.stringify(result));
                          }
                      });
                  }
              });
          } else {
              var result = {
                  state: 0,
                  msg: 'No se pudo encontrar - primera instancia!',
                  data: {}
              }

              return res.send(JSON.stringify(result));
          }
      });

  }),

  app.get('/Platform/chat-message', isLoggedIn, (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      var result = {
          state: 0,
          msg: 'No se pudo traer los usuarios!',
          data: {}
      }

      var perpage = 12
      var page = req.query.page || 1
      var filter = {'chat_id' : req.query.chat_id};

      UserChatDetail.find(filter).populate('user_id').skip((perpage * page) - perpage).limit(perpage).exec( function(err, doc){
          if(doc){
              result = {
                  state: 1,
                  msg: 'ok!',
                  data: doc
              }
          }

          res.send(JSON.stringify(result))
      });

  }),

  app.get('/Platform/chat-update-notification', isLoggedIn, (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      var result = {
          state: 0,
          msg: 'No se pudo guardar las usuarios!',
          data: {}
      }

      var user_id = mongoose.Types.ObjectId(req.query.user_id);
      var user_id_emisor = mongoose.Types.ObjectId(req.query.user_id_emisor);
      var ids = [user_id, user_id_emisor];

      var filterChat = {
          user_id: {$in: ids},
      };

      UserChat.find(filterChat).exec(function(err, doc){
          if(doc.length){
              var countDoc = (doc.length > 0)? doc.length - 1 : 0;
              var aChat = [];
              var chat_id = 0;

              doc.map(function(item, index){
                  if(aChat.indexOf(item.chat_id) > -1){
                      chat_id = item.chat_id;
                  }

                  aChat.push(item.chat_id);

                  if(countDoc == index){
                      var dChat = { alert: 0 };
                      var filter = {chat_id: chat_id, user_id : user_id_emisor};

                      UserChat.update(filter, dChat,function(errChat){
                          if(!errChat){
                              var dDetail = {$set: {state_alert: 1}};
                              var filterDetail = {chat_id: chat_id, user_id : user_id};

                              UserChatDetail.updateMany(filterDetail, dDetail, function(errDetail, docDetail){
                                  if(!errDetail){
                                      var doc = {
                                          state_alert : 0,
                                          alert : 0
                                      }

                                      result = {
                                          state: 1,
                                          msg: 'ok!',
                                          data: doc
                                      }
                                  }

                                  res.send(JSON.stringify(result));
                              });
                          } else {
                              console.log('no ingreso al final---->');
                          }
                      });
                  }
              });


          }
      });

  }),

  app.post('/Dintair/my-contact', isLoggedIn, (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      var result = {
          state: 0,
          msg: 'No se pudo guardar las usuarios!',
          data: {}
      };

      var filter = {
        $and: [
            {user_id: req.user._id},
            {user_contact_id: req.body.user_contact_id},
        ]
      };

      UserContact.find(filter).exec(function(err, doc){
        if(!doc.length){
            var data = {
                user_id: req.user._id,
                user_contact_id: req.body.user_contact_id,
                state: 1,
                created_at: Date()
            };

            var mUserContact = new UserContact(data);

            mUserContact.save(function(err, doc){
                if(!err){
                    result = {
                        state : 1,
                        msg : 'ok',
                        data: {behavior: 'add'}
                    };

                    return res.send(JSON.stringify(result));
                } else {
                    result = {state : 0, msg : 'No se registrar los cambios'};

                    return res.send(JSON.stringify(result));
                }
            });
        } else {
            UserContact.remove({_id: mongoose.Types.ObjectId(doc[0]._id)}, function(err) {
                if (!err) {
                    result = {
                        state : 1,
                        msg : 'Se borro el contacto correctamente',
                        data: {behavior: 'delete'}
                    };

                } else {
                    result = {
                        state : 0,
                        msg : 'No se borro el contacto',
                        data: {}
                    };
                }

                return res.send(JSON.stringify(result));
            });
        }
      });

  }),

  app.post('/Dintair/publication-like', isLoggedIn, (req, res) => {
      
    res.setHeader('Content-Type', 'application/json');

      var result = {
          state: 0,
          msg: 'No se pudo guardar las usuarios!',
          data: {}
      };

      function _like(behavior){
          var filterPublication = {
              _id: mongoose.Types.ObjectId(req.body.publication_id)
          }

          PublicationRecommended.find(filterPublication).exec(function(err, docPublication){
              var gLike = parseInt(docPublication[0].like);
              var dataPublication = (behavior == 'add')? {like : 1} : {like : 0};

              if(gLike){
                  var like = (behavior == 'add')? gLike + 1 : gLike - 1;

                  dataPublication = {like : like};
              }

              PublicationRecommended.update(filterPublication, dataPublication , function(err){
                  if(!err){
                      result = {
                          state : 1,
                          msg : 'ok',
                          data: {like: dataPublication.like, behavior: behavior}
                      };
                  } else {
                      result = {state : 0, msg : 'No se registrar los cambios'};
                      console.log('no grabo like');
                  }

                  res.send(JSON.stringify(result));
              });
          });
      }

      var filter = {
          $and: [
              {user_id: req.user._id},
              {publication_id: req.body.publication_id},
          ]
      };

      PublicationRecommendedLike.find(filter).exec(function(err, doc){
          if(!doc.length){
              var data = {
                  user_id: req.user._id,
                  publication_id: req.body.publication_id,
                  state: 1,
                  created_at: Date()
              };

              var mPublicationRecommendedLike = new PublicationRecommendedLike(data);

              mPublicationRecommendedLike.save(function(err, doc){
                  if(doc){
                      _like('add');
                  } else {
                      result = {state : 0, msg : 'No se registrar el like'};

                      return res.send(JSON.stringify(result));
                  }
              });
          } else {
              _like('edit');

              PublicationRecommendedLike.remove({_id: mongoose.Types.ObjectId(doc[0]._id)}, function(err) {
                  if (!err) {
                      console.log('se borro correctamente');
                  } else {
                      console.log('no se pudo borrar');
                  }
              });

          }
      });

  }),


  app.post('/Dintair/publication-recommendation-like', isLoggedIn, (req, res) => {
    res.setHeader('Content-Type', 'application/json');

      var result = {
          state: 0,
          msg: 'No se pudo guardar las usuarios!',
          data: {}
      };

      function _like(behavior){
          var filterPublication = {
              _id: mongoose.Types.ObjectId(req.body.publication_id)
          }

          Publications.find(filterPublication).exec(function(err, docPublication){
              var gLike = parseInt(docPublication[0].like);
              var dataPublication = (behavior == 'add')? {like : 1} : {like : 0};

              if(gLike){
                  var like = (behavior == 'add')? gLike + 1 : gLike - 1;

                  dataPublication = {like : like};
              }

              Publications.update(filterPublication, dataPublication , function(err){
                  if(!err){
                      result = {
                          state : 1,
                          msg : 'ok',
                          data: {like: dataPublication.like, behavior: behavior}
                      };
                  } else {
                      result = {state : 0, msg : 'No se registrar los cambios'};
                      console.log('no grabo like');
                  }

                  res.send(JSON.stringify(result));
              });
          });
      }

      var filter = {
          $and: [
              {user_id: req.user._id},
              {publication_id: req.body.publication_id},
          ]
      };

      PublicationLike.find(filter).exec(function(err, doc){
          if(!doc.length){
              var data = {
                  user_id: req.user._id,
                  publication_id: req.body.publication_id,
                  state: 1,
                  created_at: Date()
              };

              var mPublicationLike = new PublicationLike(data);

              mPublicationLike.save(function(err, doc){
                  if(doc){
                      _like('add');
                  } else {
                      result = {state : 0, msg : 'No se registrar el like'};

                      return res.send(JSON.stringify(result));
                  }
              });
          } else {
              _like('edit');

              PublicationLike.remove({_id: mongoose.Types.ObjectId(doc[0]._id)}, function(err) {
                  if (!err) {
                      console.log('se borro correctamente');
                  } else {
                      console.log('no se pudo borrar');
                  }
              });

          }
      });

  }),

  app.post('/Dintair/update-map', isLoggedIn, (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      var result = {
          state: 0,
          msg: 'No se pudo guardar las usuarios!',
          data: {}
      };

      UserMap.remove({user_id: mongoose.Types.ObjectId(req.body.user_id)}, function(err) {
          if (!err) {
              console.log('se borro correctamente');
          } else {
              console.log('no se pudo borrar');
          }
      });

      var location  = JSON.parse(req.body.location);
      var count     = location.length;
      var index     = 1;

      location.map((item) => {
          var data = {
              user_id: req.body.user_id,
              lat: item.lat,
              lng: item.lng,
              title: item.title,
              state: 1,
              created_at: Date()
          }

          var mUserMap = new UserMap(data);

          mUserMap.save(function(err, doc){
              if(!err){
                  result = {
                      state : 1,
                      msg : 'ok',
                      data: {behavior: 'add'}
                  };
              } else {
                  result = {state : 0, msg : 'No se registrar las ubicaciones'};
              }

              if(index == count){
                  console.log('ingreso');
                  return res.send(JSON.stringify(result));
              }

              index++;

          });

      });

  }),

  /*INICIO DE VISTA PARA MARKETS Y TIENDAS ONLINE*/
  app.get('/Dintair/markets/list', isLoggedIn, (req,res)=>{
    User.find({}).exec((err, usuarios)=>{
      if(err){
        res.redirect('/Dintair')
        return
      }
      res.render('espanol/forusers/users/online_markets/listmarkets',{
        user:req.user,
        usuarios: usuarios.reverse()
      })
    });
  }),
  /*FIN DE VISTA PARA MARKETS Y TIENDAS ONLINE*/

  /*INICIO DE NOTIFICACIONES DE VISUALIZACIÓN*/
  app.get('/Dintair/notification/profile', isLoggedIn, (req, res) => {
    var dNotification = {
        state:1
    }

    NotificationProfile.update({'user_id': req.user._id}, dNotification, {multi: true}, function(err){
      if(!err){
          console.log('actualizo los datos');
      }

      var filter = {
          user_id: req.user._id
      }

      NotificationProfile.find(filter).sort({updated_at: -1}).populate('user_id_emisor').exec(function(err, doc){
          var data = {
              user : req.user,
              visit:(doc.length)? doc : null
          }

          res.render('espanol/forusers/notification/profile', data);
      });
    });
  }),
  /*FIN DE NOTIFICACIONES DE VISUALIZACIÓN*/



  /*INICIO DE SISTEMA DE GESTION DE PRODUCTOS PARA CHOCOLATINA*/
  app.get('/Dintair/chocolatina/product/system', isLoggedIn, (req,res)=>{
    res.render('espanol/chocolatina/index',{
       user: req.user
    })
  }),

  app.get('/Dintair/chocolatina/addproduct', isLoggedIn, (req,res)=>{
    res.render('espanol/chocolatina/addproduct',{
      user: req.user
    })
  }),
  /*FIN DE SISTEMA DE GESTION DE PRODUCTOS PARA CHOCOLATINA*/


  //MOSTRAR LAS EMPRESAS AGREGADAS POR CADA USUARIO EN SU PERFIL, GENERARÁ QUE LAS DEMÁS EMPRESAS SEPAN QUÉ EMPRESA ES LA MÁS AGREGADA.
  //PERMITIR QUE LOS USUARIOS(EMPRESAS) SEPAN QUÉ EMPRESAS LOS APRUEBAN MÁS POR MEDIO DE SCRAPPING.
  //PERMITIR QUE LAS EMPRESAS PUEDAN ELABORAR SUS PROPIAS ENCUENTAS.



  app.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/Dintair/es/Signin')
  }),

  /*INICIO DE LOGOUT PARA CIERRE DE CUENTA*/
  app.get('/endaccount', (req,res) => {
    req.logout();
    res.redirect('/Dintair/see/you/later/dintair')
  })
  /*FIN DE LOGOUT PARA CIERRE DE CUENTA*/


}

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next()
  } 
  return res.redirect('/Dintair/es/Signin')
}