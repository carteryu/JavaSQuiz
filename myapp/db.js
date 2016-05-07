var mongoose = require('mongoose'),
    URLSlugs = require('mongoose-url-slugs');
var passportLocalMongoose = require('passport-local-mongoose');

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
    userAnswer: String,
	score: Number
});

UserSchema.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);
mongoose.model('Question', Question);
mongoose.model('Score', Score);

mongoose.connect('mongodb://localhost/finalproject');
