
# JSquizzy

## Overview

Remembering all these obscure JavaScript concepts before the exam is waaaaaay too difficult (who the heck thought of making typeof NaN actually a number???). Also, trying to dig through your books/slides to find that kind of stuff while stressed is just a recipe for disaster. Soo... that's where JSquizzy comes in!

JSquizzy is a web app that will allow users to review all the important and hard to remember concepts about Javascript with relative ease. For every concept, there will be a "flashcard" where the user can input an answer (multiple choice or through a console-like feature).


## Data Model

Minimally, we'll have to store questions, answers, users, and comments stored in MongoDB

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

// more will probably be added later as seen fit
```

## Wireframes
I drew them but I have trouble uploading it for some reason. I'll have it figured out by the next milestone. But imagine a simple facebook auth that looks like this:


![list create](documentation/userauth.png)

And then a button that takes you to take the quiz

## Research Topics

** THESE ARE NOT FINALIZED **
* (3 points) Integrate user authentication
    * Will use FB Connect
    * Probably I can find documentation somewhere.
* (3 points) Automated functional testing for all of your routes using any of the following:
    * Will be using Selenium to run unit testing
* (1 point) Use a CSS framework throughout your site, use a reasonable of customization of the framework (don't just use stock Bootstrap - minimally configure a theme):
    * Probably will use Foundation
* ... for total of 7 points 
    * Again I will likely update this as the next milestone comes and I work more on this.

