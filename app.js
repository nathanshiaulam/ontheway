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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', routes);
app.use('/about', about);
app.use('/faq', faq);
app.use('/terms', terms);
app.use('/privacy', privacy);
app.use('/contact', contact);
app.use('/login', login);
app.use('/templogin', templogin);
app.use('/signup', signup);



// Parse Shit

GLOBAL.Parse = require('parse').Parse;
Parse.initialize("zzxmLD2oQWhZZYG7fst95oV4gxRVUWC47dZAVTIT", "iPqBhzqkCZ1wxvFQAwGNr18LgEM7LnkUB7a1jfDu");

app.post('/templogin', function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   Parse.User.logIn(username, password, {
      success: function(users) {
         res.redirect('/');
      },
      error: function(users, error) {
        res.redirect('/faq');
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
