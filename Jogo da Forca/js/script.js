var words = ["TITANIC", "INCEPTION", "INTERSTELLAR", "MINECRAFT", "FORTNITE", "ZELDA", "MARIO"];
var word, guessed, wrongGuesses, gameEnded;

function init() {
    word = words[Math.floor(Math.random() * words.length)];
    guessed = [];
    wrongGuesses = 0;
    gameEnded = false;
    drawHangman();
    updateDisplay();
}

function drawHangman() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // Limpe o canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenhe a forca
        ctx.beginPath();
        ctx.moveTo(100, 350);
        ctx.lineTo(200, 350);
        ctx.moveTo(150, 350);
        ctx.lineTo(150, 100);
        ctx.lineTo(250, 100);
        ctx.lineTo(250, 150);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#000';
        ctx.stroke();

        // Desenhe o boneco
        if (wrongGuesses >= 1) drawHead(ctx);
        if (wrongGuesses >= 2) drawBody(ctx);
        if (wrongGuesses >= 3) drawLeftArm(ctx);
        if (wrongGuesses >= 4) drawRightArm(ctx);
        if (wrongGuesses >= 5) drawLeftLeg(ctx);
        if (wrongGuesses >= 6) drawRightLeg(ctx);
    }
}

function drawHead(ctx) {
    ctx.beginPath();
    ctx.arc(250, 200, 50, 0, Math.PI * 2, true);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    ctx.stroke();
}

function drawBody(ctx) {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(250, 300);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    ctx.stroke();
}

function drawLeftArm(ctx) {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(200, 275);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    ctx.stroke();
}

function drawRightArm(ctx) {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(300, 275);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    ctx.stroke();
}

function drawLeftLeg(ctx) {
    ctx.beginPath();
    ctx.moveTo(250, 300);
    ctx.lineTo(200, 350);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    ctx.stroke();
}

function drawRightLeg(ctx) {
    ctx.beginPath();
    ctx.moveTo(250, 300);
    ctx.lineTo(300, 350);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    ctx.stroke();
}

function updateDisplay() {
    var display = "";
    for (var i = 0; i < word.length; i++) {
        if (guessed.includes(word[i])) {
            display += word[i];
        } else {
            display += "_";
        }
    }
    document.getElementById("word").innerText = display;

    var keyboardRows = {
        row1: [81, 87, 69, 82, 84, 89, 85, 73, 79, 80],
        row2: [65, 83, 68, 70, 71, 72, 74, 75, 76],
        row3: [90, 88, 67, 86, 66, 78, 77]
    };

    for (var row in keyboardRows) {
        var guessDisplay = "";
        for (var i = 0; i < keyboardRows[row].length; i++) {
            var letter = String.fromCharCode(keyboardRows[row][i]);
            if (guessed.includes(letter)) {
                guessDisplay += "<span class='guessed'>" + letter + "</span>";
            } else {
                if (gameEnded) {
                    guessDisplay += "<span>" + letter + "</span>";
                } else {
                    guessDisplay += "<span onclick='guess(\"" + letter + "\")'>" + letter + "</span>";
                }
            }
        }
        document.getElementById(row).innerHTML = guessDisplay;
    }

    // Verifique se o jogador ganhou ou perdeu
    if (wrongGuesses >= 6 || word.split("").every(letter => guessed.includes(letter))) {
        gameEnded = true;
    }
}

function guess(letter) {
    if (!gameEnded) {
        guessed.push(letter);
        if (!word.includes(letter)) {
            wrongGuesses++;
        }
        drawHangman();
        updateDisplay();
    }
}

function restart() {
    init();
}

init();
