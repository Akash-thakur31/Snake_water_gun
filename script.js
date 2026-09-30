// ===============================
// GAME VARIABLES
// ===============================

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;
let round = 0;


// Available choices

const choices = ["snake", "water", "gun"];


// Emoji for displaying choices

const emojis = {
    snake: "🐍",
    water: "💧",
    gun: "🔫"
};


// ===============================
// HTML ELEMENTS
// ===============================

const playerScoreElement =
    document.getElementById("player-score");

const computerScoreElement =
    document.getElementById("computer-score");

const drawScoreElement =
    document.getElementById("draw-score");

const playerDisplay =
    document.getElementById("player-display");

const computerDisplay =
    document.getElementById("computer-display");

const resultElement =
    document.getElementById("result");

const messageElement =
    document.getElementById("message");

const roundElement =
    document.getElementById("round-number");

const restartButton =
    document.getElementById("restart-btn");


// ===============================
// COMPUTER CHOICE
// ===============================

function getComputerChoice() {

    const randomIndex =
        Math.floor(Math.random() * choices.length);

    return choices[randomIndex];
}


// ===============================
// WINNER LOGIC
// ===============================

function determineWinner(player, computer) {

    // Same choice = draw

    if (player === computer) {
        return "draw";
    }


    // Snake beats Water
    if (player === "snake" && computer === "water") {
        return "player";
    }


    // Water beats Gun
    if (player === "water" && computer === "gun") {
        return "player";
    }


    // Gun beats Snake
    if (player === "gun" && computer === "snake") {
        return "player";
    }


    // Otherwise computer wins

    return "computer";
}


// ===============================
// PLAY GAME
// ===============================

function playGame(playerChoice) {

    // Computer chooses
    const computerChoice = getComputerChoice();

    // Increase round
    round++;

    roundElement.textContent = round;

    // Display choices
    playerDisplay.textContent = emojis[playerChoice];

    computerDisplay.textContent = emojis[computerChoice];


    // =================================
    // BATTLE ANIMATION
    // =================================

    const battle = document.querySelector(".battle");

    battle.classList.remove("battle-animation");

    // Force browser to restart animation
    void battle.offsetWidth;

    battle.classList.add("battle-animation");


    // =================================
    // SELECTED BUTTON
    // =================================

    choiceButtons.forEach(function(button) {

        button.classList.remove("selected");

    });


    const selectedButton =
        document.querySelector(`[data-choice="${playerChoice}"]`);

    selectedButton.classList.add("selected");


    // =================================
    // DETERMINE WINNER
    // =================================

    const winner =
        determineWinner(playerChoice, computerChoice);


    // Remove previous animations
    resultElement.classList.remove(
        "result-win",
        "result-lose",
        "result-draw"
    );

    const resultBox =
        document.querySelector(".result-box");

    resultBox.classList.remove(
        "result-win-box",
        "result-lose-box",
        "result-draw-box"
    );


    // =================================
    // DRAW
    // =================================

    if (winner === "draw") {

        drawScore++;

        resultElement.textContent =
            "🤝 It's a Draw!";

        messageElement.textContent =
            `Both chose ${capitalize(playerChoice)}.`;


        resultElement.classList.add("result-draw");

        resultBox.classList.add("result-draw-box");

    }


    // =================================
    // PLAYER WINS
    // =================================

    else if (winner === "player") {

        playerScore++;

        resultElement.textContent =
            "🎉 You Win!";

        messageElement.textContent =
            `${capitalize(playerChoice)} beats ${capitalize(computerChoice)}!`;


        resultElement.classList.add("result-win");

        resultBox.classList.add("result-win-box");


        // Animate player score
        playerScoreElement.classList.remove("score-pop");

        void playerScoreElement.offsetWidth;

        playerScoreElement.classList.add("score-pop");

    }


    // =================================
    // COMPUTER WINS
    // =================================

    else {

        computerScore++;

        resultElement.textContent =
            "😢 You Lose!";

        messageElement.textContent =
            `${capitalize(computerChoice)} beats ${capitalize(playerChoice)}!`;


        resultElement.classList.add("result-lose");

        resultBox.classList.add("result-lose-box");


        // Animate computer score
        computerScoreElement.classList.remove("score-pop");

        void computerScoreElement.offsetWidth;

        computerScoreElement.classList.add("score-pop");

    }


    // Update scoreboard

    updateScore();
}

// ===============================
// UPDATE SCORE
// ===============================

function updateScore() {

    playerScoreElement.textContent =
        playerScore;

    computerScoreElement.textContent =
        computerScore;

    drawScoreElement.textContent =
        drawScore;
}


// ===============================
// CAPITALIZE TEXT
// ===============================

function capitalize(word) {

    return word.charAt(0).toUpperCase()
        + word.slice(1);
}


// ===============================
// BUTTON EVENTS
// ===============================

const choiceButtons =
    document.querySelectorAll(".choice");


choiceButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const playerChoice =
            button.dataset.choice;

        playGame(playerChoice);

    });

});


// ===============================
// RESTART GAME
// ===============================

restartButton.addEventListener("click", function() {

    playerScore = 0;

    computerScore = 0;

    drawScore = 0;

    round = 0;


    // Reset display

    playerDisplay.textContent = "❔";

    computerDisplay.textContent = "❔";


    // Reset result

    resultElement.textContent =
        "Choose your weapon!";

    messageElement.textContent =
        "The battle will begin when you choose.";


    // Reset scores

    updateScore();

    roundElement.textContent = 0;


    // Remove selected button

    choiceButtons.forEach(function(button) {

        button.classList.remove("selected");

    });


    // Remove animations

    resultElement.classList.remove(
        "result-win",
        "result-lose",
        "result-draw"
    );


    document
        .querySelector(".result-box")
        .classList.remove(
            "result-win-box",
            "result-lose-box",
            "result-draw-box"
        );

});