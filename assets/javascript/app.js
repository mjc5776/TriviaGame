
var correctAwsr = 0;
var incorrectAwsr = 0;
var questions = 2;
var number = 30;
var intervalId;

var correctAnswer;
var triviaAnswers = [];
var randomNum;

var queryURL = "https://opentdb.com/api.php?amount=10&category=11&type=multiple"
//var queryURL = "https://www.omdbapi.com/?t=Batman&y=&plot=short&apikey=trilogy"
$.ajax({
  url: queryURL,
  method:"GET",
}).then(function getData(response){
  
  
  $("#question").html(response.results[1].question);
    randomNum = Math.floor(Math.random() * 5); //creates random number to use to splice correct answer into array. Correct answer
    //will not be the the same button for every question.

    correctAnswer = ((response.results[1].correct_answer));
    triviaAnswers.push((response.results[1].incorrect_answers[0]));
    triviaAnswers.push((response.results[1].incorrect_answers[1]));
    triviaAnswers.push((response.results[1].incorrect_answers[2]))
    triviaAnswers.splice(randomNum, 0, correctAnswer);
    console.log(correctAnswer);
    renderButtons()
});

function renderButtons() {

  // Delete the content inside the answer-view div prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#answer-view").empty(); 
  // Loop through the array, then generate buttons for each movie in the array
  for(i=0;i< triviaAnswers.length; i++){
    
    var movieBtn = $("<button>");
      movieBtn.addClass("answer-button");
      movieBtn.attr(triviaAnswers[i]);
      movieBtn.text(triviaAnswers[i]);
      $("#answer-view").append(movieBtn);
      
};


$(".answer-button").on("click", function(event) {

  var getText = $(this).text();

  if (getText == correctAnswer) {  //Correct Answer
    alert("Winner");
    questions --;
    correctAwsr ++;

    $("#questionCount").html("Questions Remaining:"+' '+ questions);
    $("#correctGuess").html("Correct:"+' '+correctAwsr)

    if (questions  === 0) {
      alert("Game Over");
      stop();
    }; 
    
    console.log(questions);
    console.log(correctAwsr);
    
  
  }else{  // Incorrect Answer

  alert("Wrong Answer")
  questions --;
  incorrectAwsr ++;

  $("#questionCount").html("Questions Remaining:"+' '+ questions);
  $("#incorrectGuess").html("Incorrect:"+' '+incorrectAwsr);

  if (questions === 0) {
    alert("Game Over");
    stop();
  }; 

    console.log(questions);
    console.log(incorrectAwsr);
  };

  
});


//$("#start").on("click", start);

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    
    
  }

  //  The decrement function.
  function decrement() {

    number--;
    $("#show-number").html("<h2>" + number + "</h2>");
    if (number === 0) {
      stop();
      alert("Time Up!");
    }
  }

  function stop() {

    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
  }

  //  Execute the run function.
  run();
}