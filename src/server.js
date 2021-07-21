require('dotenv').config();

const express = require('express')
const app = express()

const path = require('path')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const {url} = require('./config/database')

const http = require('http')

//const https = require('https')
//var fs = require('fs')

//const server = https.createServer(app)

const nodemailer = require('nodemailer')

//var httpApp = express()
//const server = https.createServer(app)

/*var https_options ={
  key: fs.readFileSync(__dirname + "/server-key.pem"),
  cert: fs.readFileSync(__dirname + "/4883183c7c18e9d0.crt"),
  ca: [
    fs.readFileSync(__dirname + "/server-cert.pem"),
    fs.readFileSync(__dirname + "/gd_bundle-g2-g1.crt")
  ]
}*/

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});

require('./config/passport')(passport)


//settings

app.set('port', process.env.PORT || 8080)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')


/*httpApp.set('port', process.env.PORT || 80)
httpApp.get("*", function(req,res,next){
  res.redirect("https:"+"/"+"/www.dintair.com")
})

http.createServer(httpApp).listen(httpApp.get('port'), function(){
  console.log("listening on port:"+httpApp.get('port'))
})*/


//middlewares
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(cookieParser())


app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({parameterLimit: 100000, limit: '20mb', extended: true }))



app.use(session({
  secret: 'everest',
  resave: false,
  saveUninitialized: false
}));



app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


//PARA MENSAJE FLASH


//routes
require('./everest/routes')(app, passport)

//static files
app.use(express.static(path.join(__dirname, 'public')))



/*app.listen(app.get('port'), function(){
  console.log('Servidor iniciado en puerto')
});*/

const server = app.listen(app.get('port'), function(){
  console.log('Servidor iniciado en puerto')
});

/*https.createServer(https_options, app).listen(443, ()=>{console.log("Servidor corriendo")})*/



app.use(error404)

function error404(req,res,next){
  let error = new Error(),
    locals = {
      title: 'Error 404',
      description: 'Recurso no hallado',
      error: error
    }

  error.status = 404

  res.render('espanol/error', locals)
  next()
}


app.use(error500)

function error500(req,res,next){
  let error = new Error(),
    locals = {
      title: 'Error 500',
      description: 'Recurso no hallado',
      error: error
    }

  error.status = 500

  res.render('espanol/error', locals)
  next()
}


//require('./sockets.js')(server)
require('./everest/socket.js')(server)

require('./everest/job.js')
