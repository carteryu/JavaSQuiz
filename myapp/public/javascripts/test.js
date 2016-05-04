// I know I should just put this in README.md, but if you go to my "myapp" directory and type npm test, this will run.



// var assert = require('chai').assert;

// describe('Array', function() {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal(-1, [1,2,3].indexOf(5));
//       assert.equal(-1, [1,2,3].indexOf(0));
//     });
//   });

// });


var server = http.createServer(app);
var boot = function () {
	server.listen(app.get('port'), function(){
	console.info('Express server listening on port ' + app.get('port'));
	});
}
var shutdown = function() {
	server.close();
}
if (require.main === module) {
	boot();
}
else {
	console.info('Running app as a module')
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = app.get('port');
}