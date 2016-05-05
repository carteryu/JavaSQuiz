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
        res.redirect('/');
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
        res.redirect('/');
      });
    }
  });   
});

router.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/');
});


router.get('/questions', function(req,res,next){
	Question.find(function(err,allquestions,count){
		res.render('questions', {questions : allquestions});
	})
});


router.post('/questions', function(req,res,next){
  var answer = req.body.answer;
  var id = req.body.id;
  console.log(answer);
  console.log(id);
  res.redirect('questions');
});

router.get('/add', function(req,res,next){
	res.render('add');
});

function addQuestion(question, answer, explaination) {
  var q = new Question({
    title:question,
    answer:answer,
    explaination:explaination
  });
  return q;
}

router.post('/add', function(req, res, next){
    var question = req.body.question;
    var answer = req.body.answer;
    var explaination = req.body.explaination;
    var q = addQuestion(question, answer, explaination);
    q.save(function(err,list,count){
      res.redirect(303, 'add');
    })
});



module.exports = router;
module.exports.addQuestion = addQuestion;

