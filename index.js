var gamePattern = [];
var userPicked = [];
var colors = ["green", "red", "yellow", "blue"];
var started = false;
var level = 0;

$(document).keyup(function() {
    if(!started) {
        if($("body").hasClass("game-over") === true) {
            $("body").removeClass("game-over");
        }
        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(".btn").click(function() {
    userPicked.push(this.id);
    animatePress(this.id);
    checkAnswer(userPicked.length - 1);
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNumber];
    gamePattern.push(randomColor);
    // $("#" + randomColor).delay(100).fadeOut().fadeIn("slow");
    colorSequence();
    level++;
    $("#level-title").text("Level " + level);
}

function animatePress (color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");    
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userPicked[currentLevel]) {
        if(gamePattern.length === userPicked.length) {
            userPicked.length = 0;
            nextSequence();
        }
    } else {
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Start");
        userPicked.length = 0;
        gamePattern.length = 0;
        level = 0;
        started = false;
    }
};

function colorSequence() {
    for(var i = 0; i < gamePattern.length; i++) {
        (function(i) {
            setTimeout(function() {
            $("#" + gamePattern[i]).delay(100).fadeOut().fadeIn("slow");
            }, 1000 * i);
        }(i));
    }
}