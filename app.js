var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var about = require('./routes/about');
var faq = require('./routes/faq');
var terms = require('./routes/terms');
var privacy = require('./routes/privacy');
var contact = require('./routes/contact');

var signup = require('./routes/signup');
var templogin = require('./routes/templogin');
var login = require('./routes/login');

var app = express();

// VIEW ENGINE SET UP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// INITIALIZE PARSE  
GLOBAL.Parse = require('parse').Parse;
Parse.initialize("zzxmLD2oQWhZZYG7fst95oV4gxRVUWC47dZAVTIT", "iPqBhzqkCZ1wxvFQAwGNr18LgEM7LnkUB7a1jfDu");

// ROUTES
app.use('/', routes);
app.use('/about', about);
app.use('/faq', faq);
app.use('/terms', terms);
app.use('/privacy', privacy);
app.use('/contact', contact);
app.use('/login', login);
app.use('/templogin', templogin);
app.use('/signup', signup);

// PARSE SERVER CODE

function formatNumber(phone) {
  var newPhone = "";
  for (var i = 0; i < phone.length; i++) {
      var num = /^[0-9]+$/.test(phone.charAt(i));
      if (num) {
          newPhone += phone.charAt(i);
      }
  }
  return newPhone;
}
// CREATE A NEW USER
app.post('/signup', function(req,res){
    var email = req.body.email;
    var phone = req.body.phone
    var password = req.body.password;

    var user = new Parse.User();

    // FORMAT DATA PRIOR TO SANITIZING 
    // username = username.trim();
    // email = email.trim();
    // password = password.trim();
    phone = formatNumber(phone.trim());
    phone = "1" + phone;

    // SET USER FIELDS
    
    user.set("fName", username);
    user.set("username", phone);
    user.set("email", email);
    user.set("password", password);

    user.signUp(null, {
      success: function(user) {
        res.redirect('/');
      },
      error: function(user, error) {
        return false;
      }
    });
});

app.post('/templogin', function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   Parse.User.logIn(username, password, {
      success: function(user) {
         res.redirect('/');
      },
      error: function(user, error) {
         alert("Error: " + error.code + " " + error.message);
      }
   });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
