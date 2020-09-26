
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;

let level = 0;

const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

const playSound = name => {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

const animatePress = currentColor => {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

const checkAnswer = currentLevel => {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000)
        }
    } else {
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

const startOver = () => {
    level = 0;
    started = false;
    gamePattern = [];
}