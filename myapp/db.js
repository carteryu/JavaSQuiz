var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

//username and password provided by passport
var UserSchema = new mongoose.Schema({ 
	name: String
});

var Question = new mongoose.Schema({
	title: String,	
	answer: String,
	explaination: String
});

var Score = new mongoose.Schema({
    userName: String,
	score: Number
});

UserSchema.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);
mongoose.model('Question', Question);
mongoose.model('Score', Score);

mongoose.connect('mongodb://localhost/finalproject');
