
function playAudio(boxClass) {
    if (boxClass === "green") {
        var audio = new Audio("./sounds/tom-1.mp3");
        audio.play();
    }
    else if (boxClass === "red") {
        var audio = new Audio("./sounds/tom-4.mp3");
        audio.play();
    }
    else if (boxClass === "yellow") {
        var audio = new Audio("./sounds/crash.mp3");
        audio.play();
    }
    else if (boxClass === "blue") {
        var audio = new Audio("./sounds/snare.mp3");
        audio.play();
    }
    else if (boxClass === "gameOver") {
        var audio = new Audio("./sounds/gameOver.mp3");
        audio.play();
    }
}

function boxFlash(boxClass) {
    $("." + boxClass).addClass("boxClicked");
    setTimeout(function () {
        $("." + boxClass).removeClass("boxClicked");
    }, 100)
}

function randomBoxSelector() {
    var randomBox = Math.floor(4 * Math.random());
    switch (randomBox) {
        case 0:
            playAudio("green");
            boxFlash("green");
            return "green";
        case 1:
            playAudio("red");
            boxFlash("red");
            return "red";
        case 2:
            playAudio("yellow");
            boxFlash("yellow");
            return "yellow";
        case 3:
            playAudio("blue");
            boxFlash("blue");
            return "blue";
    }
}

var boxArr = [];
var boxArrIndex = 0;
var start = 0;
var score = 0;

function gameOver() {
    boxArrIndex = 0;
    boxArr = [];
    score = 0;
    start = 0;
    $("#mainHeading").text("Game Over press any key to startover");
    $("body").addClass("gameOver");
    playAudio("gameOver");
    setTimeout(() => { $("body").removeClass("gameOver"), 500 });
}

function boxAdd() {
    setTimeout(() => { boxArr[boxArr.length] = randomBoxSelector() }, 1000);
}

function boxSelected(boxClass) {
    if (boxClass !== boxArr[boxArrIndex]) {
        gameOver();
    }
    else if (boxClass === boxArr[boxArrIndex] && boxArrIndex < boxArr.length - 1) {
        boxArrIndex++;
    }
    else if (boxClass === boxArr[boxArrIndex] && boxArrIndex === boxArr.length - 1) {
        boxArrIndex = 0;
        score++;
        $("#mainHeading").text("Level " + score);
        boxAdd();
    }
}

$(".box").on("click", function () {
    var classTokenList = this.classList;
    for (var i = 0; i < classTokenList.length; i++) {
        if (classTokenList[i] === "green" || classTokenList[i] === "red" || classTokenList[i] === "yellow" || classTokenList[i] === "blue") {
            playAudio(classTokenList[i]);
            boxFlash(classTokenList[i]);
            boxSelected(classTokenList[i]);
        }
    }
});

function startGame() {
    boxArr[0] = randomBoxSelector();
    $("#mainHeading").text("Level " + score);
    start = 1;
}

$(document).keydown(function () {
    if (start === 0) {
        startGame();
    }
});