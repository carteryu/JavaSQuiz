document.addEventListener("DOMContentLoaded", main);

function main(){
	var submit = document.getElementsByClassName('submit-answer');
	for (var i = 0; i < submit.length; i++){
	//submit.forEach(function(ele){
		
		submit[i].addEventListener('click', function(evt){

			evt.preventDefault();
			
			var req = new XMLHttpRequest();
			//var id = document.getElementByValue('_id');
			var idOfInputField = this.dataset.answer
			var thisAnswer = document.getElementById(idOfInputField).value;
			
			var id = evt.target.id;
			var url = 'http://localhost:3000/api/question' + "?id=" + id;
			var idOfQuestionBox = this.dataset.box;
			var questionbox = document.getElementById(idOfQuestionBox)
			console.log(questionbox);
			
			req.open("GET",url,true);
			req.addEventListener('load', function(){
				var correct = ["Correct!", "Good job!", "Yes!"];
				// var incorrect = ["Incorrect.", "No, sorry!", "Wrong. :("]
				var returnedQuestion = JSON.parse(req.responseText);
				// console.log(returnedQuestion.answer);
				var answerDiv = document.createElement('div');
				var ran = Math.floor((Math.random() * 3));
				if (normalize(returnedQuestion.answer) === normalize(thisAnswer)) {
					var validation = correct.filter(function(ele){
						return (ele===correct[ran]);
					});
					answerDiv.textContent = validation;
				}
				else {
					answerDiv.textContent = "Incorrect. The correct answer is \"" + returnedQuestion.answer + "\"";
				}
				questionbox.appendChild(answerDiv);
				var exDiv = document.createElement('div');
				exDiv.textContent = returnedQuestion.explaination
				questionbox.appendChild(exDiv);
				document.getElementById(id).disabled = 'disabled';

			})
			req.send();

			// var req2= new XMLHttpRequest();
			// var url2 = 'http://localhost:3000/api/score' + "?score=" + score;
			// req2.open("POST", url2, true);

			// req2.addEventListener('load', function(evt){
			// 	var data = JSON.parse(req2.responseText);
			// 	console.log(data)

			// }
			// req2.send();

		});
	};
};

function normalize(string){
	string = string.split(" ");
	string.forEach(function(ele, ind){
		ele = ele.toLowerCase();
		string[ind] = ele;
	});
	string = string.join(" ");
	string = string.replace(/ /g, '');
	return string;
}