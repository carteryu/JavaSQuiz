var assert = require('chai').assert;
var addQuestion = require('../routes/index').addQuestion;
var matchID = require('../routes/index').matchID;


describe('Index', function() {
	describe('#addQuestion(question, answer, explaination)', function () {
		it('should return answer object', function () {
			var question = addQuestion('What is my name', 'Apple', 'Simple question');
				assert.property(question, '_id');
				assert.equal('Simple question', question.explaination);
				assert.equal('Apple', question.answer);
				});
			});
});

describe('Index', function(){
    describe('#matchID(id,res)', function() {
        it('should successfully get the data so that we can verify user submission', function(){
            matchID('572d4617435be0dc3362b9c7', function(question) {
                assert.property(question, '_id');
            });
        });
    });
});

//todo
//1. write 2 more mocha tests
//3. validation
//4. redeploy and redo readme