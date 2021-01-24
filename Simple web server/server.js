var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const { error } = require('console');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
 res.render('index', {title: 'Welcome'});
});

app.get('/about', function(req, res) {
  res.render('about', {title: 'About'});
});

app.get('/contact', function(req, res) {
  res.render('contact', {title: 'Contact'});
});

app.post('/contact/send', function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'vova@gmail.com',
      pass: '*****'
    }
  });

  var mailOptions = {
    from: 'Vova <vova@gmail.com>',
    to: 'panzer@bigmir.net',
    subject: 'WebSite submision',
    text: 'You have a submission with following details... Name: ' + req.body.name + 'Email:' + req.body.email + 'Message:' + req.body.message,
    html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('error',error);
      res.redirect('/');
    } else {
      console.log('Message send', + info.response);
      res.redirect('/');
    }
  })
 })

app.listen(3000);
console.log("server on 3000")