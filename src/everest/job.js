
var cron        = require('node-cron');
var nodemailer  = require('nodemailer');
const pug       = require('pug');

const User = require('./models/user')

/*
let transport = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'amadeusc2@gmail.com',
    pass: ''
  },
  tls: {
    rejectUnauthorized: false
  }
});
*/

var transport = nodemailer.createTransport({
  host: process.env.JOB_HOST,
  port: process.env.JOB_PORT,
  auth: {
    user: process.env.JOB_USER,
    pass: process.env.JOB_PASS
  }
});

const file      = __dirname + '/../views/email/template.pug';

const param = {
  data: {
      token: process.env.JOB_TOKEN,
      url: 'https:www.google.com'
  }
}

const template = pug.renderFile(file, param);

let HelperOptions = {
  from: 'Dintair Services <fernandomadueno1@gmail.com>',
  //to: 'amadeusc2@gmail.com',
  to: process.env.JOB_TO,
  subject: 'Hello, world',
  //text: 'Wow this tutorial is amazing'
  html: template
}

var task = cron.schedule('10 31 11 27 4 monday', () =>  {  
  console.log('stoped task');

  transport.sendMail(HelperOptions, (error, info) =>{
    if(error){
      return console.log(error);
    }

    console.log("Them message was send!");
    console.log(info);

    
  });
}, {
  scheduled: false
});
 
task.start();