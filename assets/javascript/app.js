var correctAwsr = 0;
var incorrectAwsr = 0;
var questions = 10;
var number = 30;
var intervalId;
var gameStart = 0;

var correctAnswer;
var triviaAnswers = [];
var randomNum;


var queryURL = "https://opentdb.com/api.php?amount=10&category=11&type=multiple"
//var queryURL = "https://www.omdbapi.com/?t=Batman&y=&plot=short&apikey=trilogy"

$(document).on('click', '#startGame', function (e) {
  getAnswers();
  $(this).hide();
  run();
});

function getAnswers() {
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {

    $("#question").html(response.results[1].question);
    randomNum = Math.floor(Math.random() * 5); //creates random number to use to splice correct answer into array. Correct answer
    //will not be the the same button for every question.

    correctAnswer = ((response.results[1].correct_answer));
    triviaAnswers.push((response.results[1].incorrect_answers[0]));
    triviaAnswers.push((response.results[1].incorrect_answers[1]));
    triviaAnswers.push((response.results[1].incorrect_answers[2]))
    triviaAnswers.splice(randomNum, 0, correctAnswer);

    $("#answer-view").empty();
    renderButtons()
  });
};

function renderButtons() {

  for (i = 0; i < triviaAnswers.length; i++) {
    $('#showAnswer').empty();
    $('#gameStatus').empty();
    var movieBtn = $("<button>");
    movieBtn.addClass("answer-button");
    movieBtn.attr(triviaAnswers[i]);
    movieBtn.text(triviaAnswers[i]);
    $("#answer-view").append(movieBtn);
    console.log("Test");

  };


  $(".answer-button").on("click", function (event) {

    var getText = $(this).text();

    if (getText == correctAnswer) { //Correct Answer
      stop();

      $('#showAnswer').text('Yes! The correct answer is' + ' ' + correctAnswer)
      questions--;
      correctAwsr++;
      $("#answer-view").empty();
      triviaAnswers = [];

      setTimeout(function () {
        getAnswers()
        reset();
      }, 4000);


      $("#questionCount").html("Questions Remaining:" + ' ' + questions);
      $("#correctGuess").html("Correct:" + ' ' + correctAwsr)

      if (questions === 0) {
        $("#gameStatus").text('Game Over')
        stop();
      };


    } else { // Incorrect Answer
      stop();
      $("#showAnswer").text('Incorrect! The correct answer is' + ' ' + correctAnswer)
      questions--;
      incorrectAwsr++;

      $("#questionCount").html("Questions Remaining:" + ' ' + questions);
      $("#incorrectGuess").html("Incorrect:" + ' ' + incorrectAwsr);
      $("#answer-view").empty();
      triviaAnswers = [];

      setTimeout(function () {
        getAnswers();
        reset();
      }, 4000);


      if (questions === 0) {
        $('#showAnswer').text('Yes! The correct answer is' + ' ' + correctAnswer)
        $("#gameStatus").text('Game Over')

        stop();
        reset();

        correctAwsr = 0;
        incorrectAwsr = 0;
        questions = 5

        $("#questionCount").html("Questions Remaining:" + ' ' + questions);
        $("#incorrectGuess").html("Incorrect:" + ' ' + incorrectAwsr);
        $("#correctGuess").html("Correct:" + ' ' + correctAwsr)

      };

    };

  });

}

var number = 31;
var intervalId;

function run() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
}

//  The decrement function.
function decrement() {

  //  Decrease number by one.
  number--;

  //  Show the number in the #show-number tag.
  $("#show-number").html("<h2>" + number + "</h2>");


  //  Once number hits zero...
  if (number === 0) {

    stop();
    $("#showAnswer").text('Times Up! The correct answer is' + ' ' + correctAnswer);
    questions--;
    incorrectAwsr++;

    $("#questionCount").html("Questions Remaining:" + ' ' + questions);
    $("#incorrectGuess").html("Incorrect:" + ' ' + incorrectAwsr);
    $("#answer-view").empty();
    triviaAnswers = [];

    setTimeout(function () {
      getAnswers();
      reset();
    }, 4000);


  }
}

//  The stop function
function stop() {

  clearInterval(intervalId);
}

function reset() {
  run();
  number = 31;
}

//run();