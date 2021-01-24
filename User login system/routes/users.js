var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

router.post('/register', upload.single('profileimage'), function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(req.file) {
    console.log('upload')
    var progileImage = req.file.filename;
  } else {
    console.log('no upload')
    var profileimage = 'noimage.jpeg';
  }

  // Form validation
  req.checkBody('name', "name field is required").notEmpty();
  req.checkBody('email', "email field is required").notEmpty();
  req.checkBody('email', "emailname field is valid").isEmail();
  req.checkBody('username', "username field is required").notEmpty();
  req.checkBody('password', "password field is required").notEmpty();
  req.checkBody('password2', "password do not match").equals(req.body.password);

  // Check errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    })
  } else {
    console.log('no errors');
  }

});


module.exports = router;