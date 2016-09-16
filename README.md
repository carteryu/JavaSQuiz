# JavaSquiz

## Overview

Remembering all these obscure JavaScript concepts before the exam is way too difficult (who the heck thought of making typeof NaN actually a number??). Also, trying to dig through your books/slides to find that kind of stuff the night before an exam or interview is just a recipe for disaster. So that's where JavaSquiz comes in.

JavaSquiz is a web app that allows users to review all the important and hard to remember concepts about Javascript with relative ease.

## Data Model
Questions, answers, and users are stored in MongoDB

* correct questions/answers of each user are kept track
* comments are stored and then displayed in a list/discussion board-esque fashion


First draft schema:

```javascript
// users
// * our site will have an optional user authentication
// * so users will voluntarily have a username and password
// * logged users will be able to be able to track progress
// * (and maybe add to discussion board)
var User = new mongoose.Schema({
  // username, password provided by plugin
  score:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'score' }]
});

// a list of flashcards that the user will go through
// as user gets a correct one, they are "checked" off the list
var Item = new mongoose.Schema({
	name: {type: String, required: true},
	quantity: {type: Number, min: 1, required: true},
	checked: {type: Boolean, default: false, required: true}
}, {
	_id: true
});

// a flashcard
// * each flashcard has a question and answer
var Item = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  question: {type: String, required: true},
	createdAt: {type: Date, required: true},
	answer: {type: String, required: true},
});


```



