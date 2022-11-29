var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var level = 0;
var started = false;

// Start of game detection
$(document).keypress(function(event){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //Animation For The User
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // Playing Audio For The User
    var audio = new Audio("sounds/"+ randomChosenColor +".mp3");
    audio.play();
    // Changing the level and h1 on every color generated
    level++;
    $("#level-title").text("Level " + level);
}

// Event Listener to detect, store and animate the keypress
$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length)-1);
});

// Animating the buttons on pressing
function animatePress(currentColor){
    var audio_user = new Audio("sounds/"+ currentColor +".mp3");
    audio_user.play();
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        $("#level-title").addClass("game-over-font");
        $("#level-title").text("Game Over, Press Any Key To Restart");
        var audio_w = new Audio("sounds/wrong.mp3");
        audio_w.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    setTimeout(function(){
        $("#level-title").text("Press Any Key to Start");
    },2000);
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}
