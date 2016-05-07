var assert = require('chai').assert;
var addQuestion = require('../routes/index').addQuestion;


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