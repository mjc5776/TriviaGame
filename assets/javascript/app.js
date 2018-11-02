
var correctAwsr = 0;
var incorrectAwsr = 0;
var number = 30;
var intervalId;

var queryURL = "https://opentdb.com/api.php?amount=10&category=11&type=multiple"
//var queryURL = "https://www.omdbapi.com/?t=Batman&y=&plot=short&apikey=trilogy"
$.ajax({
  url: queryURL,
  method:"GET",
}).then(function(response){
  
  
  $("#question").html(response.results[1].question);
  $("#answer1").html(response.results[1].correct_answer);
  $("#answer2").html(response.results[1].incorrect_answers[0]);
  $("#answer3").html(response.results[1].incorrect_answers[1]);
  $("#answer4").html(response.results[1].incorrect_answers[2]);

});


$("#start").on("click", start);

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

      //  ...run the stop function.
      stop();

      //  Alert the user that time is up.
      alert("Time Up!");
    }
  }

  //  The stop function
  function stop() {

    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
  }

  //  Execute the run function.
  run();