var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function(){
    if(!started)
    {
        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("level" + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    console.log(userClickedPattern);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    // how you can use Javascript to remove the pressed class after a 100 milliseconds.

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Create a new function called checkAnswer(), it should take one input with the name currentLevel

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {

    console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length == gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
        nextSequence();
        }, 1000);

    }

    }
    else
    {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

//Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.

    $("#level-title").text("Game Over, Press Any Key to Restart");

    //Call startOver() if the user gets the sequence wrong.

    startOver();

    }

}

function nextSequence()  //callback function()
{
    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("level" + level);

    var randomNumber = Math.floor(Math.random() * 4) ;

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function startOver()
{
    level = 0;

    gamePattern = [];

    started = false;
}






