var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var level = 0;
var started = false;

// ゲームスタート
$('body').keypress(function () {

    if (!started) {
        nextSequence();
        started = true;
    }
});

$('.btn').on('click', function (event) {
    // クリックされた要素のIDを取得
    var clickedColorID = event.target.id;
    playColorSound(clickedColorID);
    animatePress(clickedColorID);
    userClickedPattern.push(clickedColorID);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1').text('level ' + level);
    // 0-3の乱数を生成
    var randomNumber = Math.floor(Math.random() * 4);
    // buttonColorsに含まれているcolorから1つピックアップ
    randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playColorSound(randomChosenColor);
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

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success');

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log('wrong');

        playColorSound('wrong');

        $('body').addClass('game-over');

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        $('h1').text('Game Over, Press Any Key to Restart');

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}