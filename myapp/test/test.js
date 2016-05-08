var assert = require('chai').assert;
var addQuestion = require('../routes/index').addQuestion;
var matchID = require('../routes/index').matchID;
var displayAllQuestions = require('../routes/index').displayAllQuestions;


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
    describe('#matchID(id,callback)', function() {
        it('should return the data so that we can verify user submission', function(){
            matchID('572d4617435be0dc3362b9c7', function(question) {
                assert.property(question, '_id');
            });
        });
    });
});

describe('Index', function(){
	describe('#displayAllQuestions(callback)',function(){
		it('should return all the questions, ready to be rendered', function(){
			displayAllQuestions(function(q){
				assert.property(q, 'title');
			});
		});
	});
});

