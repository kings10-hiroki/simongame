var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var level = 0;

$('body').keypress(function () {

    nextSequence();
});

function nextSequence() {

    $('h1').text('level ' + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playColorSound(randomChosenColor);

    $('.btn').on('click', function (event) {
        // console.log(event.target);
        var clickedColorID = event.target.id;
        playColorSound(clickedColorID);
        animatePress(clickedColorID);
        userClickedPattern.push(clickedColorID);

        checkAnswer(level);
    });
}

function playColorSound(colorName) {

    var filename = 'sounds/' + colorName + '.mp3';
    var colorSound = new Audio(filename);
    colorSound.play();
}

function animatePress(currentColor) {

    $('#' + currentColor).addClass('pressed');

    setTimeout(() => {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer() {

    if (userClickedPattern[level] === gamePattern[level]) {
        // console.log('success');
        level++;

        setTimeout(() => {
            nextSequence();
        }, 1000);
    } else {
        console.log('wrong');
    }
}