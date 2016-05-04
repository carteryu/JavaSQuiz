require('../db.js');
require('../auth');
var express = require('express');
var router = express.Router();
var passport = require('passport');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var Question = mongoose.model('Question');

var validator = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'JSquizzy'});
});

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req,res,next) {
  // NOTE: use the custom version of authenticate so that we can
  // react to the authentication result... and so that we can
  // propagate an error back to the frontend without using flash
  // messages
  passport.authenticate('local', function(err,user) {
    if(user) {
      // NOTE: using this version of authenticate requires us to
      // call login manually
      req.logIn(user, function(err) {
        res.redirect('/questions');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
  // NOTE: notice that this form of authenticate returns a function that
  // we call immediately! See custom callback section of docs:
  // http://passportjs.org/guide/authenticate/
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) {
      // NOTE: error? send message back to registration...
      res.render('register',{message:'Your registration information is not valid'});
    } else {
      // NOTE: once you've registered, you should be logged in automatically
      // ...so call authenticate if there's no error
      passport.authenticate('local')(req, res, function() {
        res.redirect('/questions');
      });
    }
  });   
});



router.get('/questions', function(req,res,next){
	Question.find(function(err,allquestions,count){
		res.render('questions', allquestions);
	})

});

router.get('/add', function(req,res,next){
	res.render('add');
});

router.post('/add', function(req, res, next){
    req.body.question = question;
    req.body.answer = answer;
    //save question and answer here
});



module.exports = router;