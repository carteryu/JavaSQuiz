var mongoose = require('mongoose'),
    URLSlugs = require('mongoose-url-slugs');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({ });


var Question = new mongoose.Schema({
	title: String,
	answers: {
		correct: String,
		incorrect: [String] },
	entered: {type: Date, default: Date.now}
});
var Score = new mongoose.Schema({
    username: String,
	score: Number,
	date: {type: Date, default: Date.now},
});

Question.plugin(URLSlugs('title'));
UserSchema.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);
mongoose.model('Question', Question);
mongoose.model('Score', Score);

mongoose.connect('mongodb://localhost/finalproject');