
# (Name of your project) Shoppy Shoperson

## Overview

(Write a brief one or two paragraph, high-level description of your project here) Remembering what to buy at the grocery store is waaaaay too difficult. Also, shopping for groceries when you're hungry leads to regrettable purchases. Sooo... that's where Shoppy Shoperson comes in!

Shoppy Shoperson is a web app that will allow users to keep track of multiple grocery lists. Users can register and login. Once they're logged in, they can create or view their grocery list. For every list that they have, they can add items to the list or cross of items.


## Data Model

(Describe the documents that you'll be storing - assuming that you're using a document based NoSQL database, like mongoose ... this can be in the form of commented plain JavaScript objects or an _actual_ Mongoose schema)

Minimally, we'll have to store Users, Lists and Items

* users can have multiple lists
* each list can have multiple items

First draft schema:

```javascript
// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more lists
var User = new mongoose.Schema({
  // username, password provided by plugin
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
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

