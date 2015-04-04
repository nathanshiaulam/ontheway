var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	// if(Parse.User.current()) {
   		res.render('index', { title: 'ontheway' });
  	// }
  	// else {
  	// 	res.redirect('/login');
  	// }
});

module.exports = router;
