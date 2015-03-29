var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
   		res.render('faq', { title: 'ontheway' });
});

module.exports = router;
