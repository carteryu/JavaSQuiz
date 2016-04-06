
# Javey Scripterson

## Overview

Remembering all these obscure JavaScript concepts before the exam is waaaaaay too difficult (who the heck thought of making typeof NaN actually a number???). Also, trying to dig through your books/slides to find that kind of stuff while stressed is just a recipe for disaster. Soo... that's where Javey Scripterson comes in!

Javey Scripterson is a web app that will allow users to review all the important and hard to remember concepts about Javascript with relative ease. For every concept, there will be a "flashcard" where the user can input an answer (multiple choice or through a console-like feature).


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

// an item (or group of the same items) in a grocery list
// * includes the quantity of this item (multiple of the same item does not 
//   require additional Item documents; just increase the quantity!)
// * items in a list can be crossed off
var Item = new mongoose.Schema({
	name: {type: String, required: true},
	quantity: {type: Number, min: 1, required: true},
	checked: {type: Boolean, default: false, required: true}
}, {
	_id: true
});

// a grocery list
// * each list must have a related user
// * a list can have 0 or more items
var List = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: {type: String, required: true},
	createdAt: {type: Date, required: true},
	items: [Item]
});
```

## Wireframes

![list create](documentation/list-create.png)

## Reserach Topics



* (3 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (2 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (2 points) use awesome js library that i found
    * the library does...
    * you can see it working in these pages:
        * link 1
        * link 2
* ... for total of 6 points 
    * additional points of research will make up for research topics that did not get full credit
    * but won't count for extra credit

