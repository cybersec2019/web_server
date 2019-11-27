var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

/* Get login page. */
router.get('/', function(req, res, next) {
  if(req.cookies.logged){
  	res.redirect('/member');
  } else {
  	res.render('login', { title: 'Login' });
  }
});

/* Proccess Login */
router.post('/', function(req, res, next) {
    var email = req.body.email;
    var pass = req.body.password;
    User.findOne({'email':email, 'password':pass}, function (err, user) {
        console.log("-----Req cookie here:---",req.headers)
        if (err) console.log(err)
        if(user==null) {res.render('login', { title: 'Login' }); return;}


        res.cookie('logged', user.id);
        //res.cookie("logged","12345");
        res.redirect('/member');
    });

})
module.exports = router;
