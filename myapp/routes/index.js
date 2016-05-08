require('../db.js');
require('../auth');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser')

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Score = mongoose.model('Score');

var validator = require('express-validator');
var un = "";


router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res) {
  res.render('login');
});


router.post('/login', function(req,res,next) {
  passport.authenticate('local', function(err,user) {
    if(user) {
      un = user;
      req.logIn(user, function(err) {
        res.redirect('/');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect. Have you registered?'});
    }
  })(req, res, next);

});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username, name:req.body.name}), 
      req.body.password, function(err, user){
    if (err) {

      res.render('register',{message:'Username is taken!'});
    } else {
      un=user;
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

//test to see if backend is connected and if we can display our question bank
function displayAllQuestions(callback){
  Question.find(function(err,allquestions,count){
    callback(allquestions);
  });
}
router.get('/questions', function(req,res,next){
  displayAllQuestions(function(questions){
		res.render('questions', {questions : questions});
	});
});


// function normalize(string){
//   var result = string.toLowerCase();
//   return result;
// }
// router.post('/questions', function(req,res,next){
//   var userAnswer = req.body.answer;
//   var id = req.body.id;

//   console.log(userAnswer);
//   console.log(id);
//   Question.findOne({'_id':id}, function(err,question,count){
//     console.log(question);
//     var correct = question.answer;
//     if (normalize(correct)===normalize(userAnswer)){
//       res.render('test', {ans : "Correct!"})
//     }
//     else{
//       res.render('test', {ans : "Wrong!"});
//     }
//   })
// });

router.get('/add', function(req,res,next){
	res.render('add');
});

//testing this function to see if we can properly add to database
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
      if (err){
        res.render('add', {error: true});
      }
      else {
        res.render('add', {'submitted' : list});
      }
      //res.json(list);
      // if(err) {
      //   res.json({error: true});
      // } else {
      //   res.json(add);
      // }
    })
});


//display all questions
router.get('/api/questions', function(req,res){
  Question.find(function(err,questions,count){
    if (err){
      res.json({error:true});
    }
    else {
      res.json(questions);
   }
  });
});

//testing this function to see if res.json gives us what we want.
function matchID(id, callback) { 
  Question.findOne({'_id' : id}, function(err,question,count){
    callback(question);
  });
};
//display the one filtered question
router.get('/api/question', function(req,res){
  var id = req.query.id;
  matchID(id, function(questions) {
    res.json(questions);
  });
});

// router.get('/api/score', function(req,res){
//   Score.find(function(err,score,count){
//     res.json(score);
//   })
// })
// router.post('/api/score', function(req,res){
//   (new Score({
//       userName: un,
//       score: 0
//   })).save(function(err, score, count) {
//     res.json(score);
//   });
// });

router.get('/delete', function(req,res){
  res.render('delete')
});

router.post('/delete', function(req,res){
  Question.remove({title: req.body.title}, function(err,questions,count) {
    if (err) {
      res.render('delete',{error:true});
    }
    else {
      if(questions.result.n ==0){
        res.render('delete',{error:true});
      }else{ 
        res.render('delete',{submitted: questions.result.n, body: req.body.title});

      }
    }
});
});




module.exports = router;

//exporting these functions for testing purposes
module.exports.addQuestion = addQuestion;
module.exports.matchID = matchID;
module.exports.displayAllQuestions = displayAllQuestions;

