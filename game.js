var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var lives = 3;
var isMuted = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("#restart-btn").removeClass("hidden");  // Show restart button after game starts
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    lives--;
    if (lives > 0) {
      $("#level-title").text("Wrong! " + lives + " lives left.");
      playSound("wrong");
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart or Click Restart Button");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var flashSpeed = Math.max(100 - (level * 5), 50);
  $("#" + randomChosenColour).fadeIn(flashSpeed).fadeOut(flashSpeed).fadeIn(flashSpeed);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  if (!isMuted) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
}

function startOver() {
  level = 0;
  lives = 3;
  gamePattern = [];
  started = false;
  $("#restart-btn").addClass("hidden");  // Hide restart button when game is over
}

// Mute/Unmute Button
$("#mute-btn").click(function() {
  isMuted = !isMuted;
  $("#mute-btn").text(isMuted ? "Unmute" : "Mute");
});

// Restart Button Logic
$("#restart-btn").click(function() {
  startOver();
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;  // Restart the game
});
