const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
const codeLength = 4;
const maxAttempts = 10;

let attempts = 0;
let secretCode = [];

// 🔹 DOM Elements
document.addEventListener("DOMContentLoaded", () => {
const container = document.getElementById("container");
const input = document.getElementById("guessInput");
const button = document.getElementById("guessBtn");
const overlay = document.getElementById("overlay");
const overlayPlayAgain = document.getElementById("overlayPlayAgain");
const resultText = document.getElementById("resultText");
const secretText = document.getElementById("secretText");

// 🔹 Generate Secret Code
function generateSecretCode() {
    return Array.from({ length: codeLength }, () =>
        colors[Math.floor(Math.random() * colors.length)]
    );
}

// 🔹 Start / Reset Game
function startGame() {
    secretCode = generateSecretCode();
    attempts = 0;
    container.innerHTML = "";       // Clear previous guesses
    input.value = "";
    overlay.classList.add("hidden");
    console.log("Secret code:", secretCode); // Debug
}

// 🔹 Handle Guess
function makeGuess() {
    if (attempts >= maxAttempts) return;

    const guess = input.value
        .trim()
        .toLowerCase()
        .split(/[\s,]+/) // allow space OR comma
        .filter(Boolean);

    if (guess.length !== codeLength) {
        alert(`Enter exactly ${codeLength} colors`);
        return;
    }

    const invalid = guess.filter(color => !colors.includes(color));
    if (invalid.length > 0) {
        alert(`Invalid colors: ${invalid.join(", ")}`);
        return;
    }

    const feedback = getFeedback(guess);
    drawGuess(guess, feedback);

    if (feedback.greens === codeLength) {
        showWin();
        return;
    }

    attempts++;

    if (attempts === maxAttempts) {
        showLose();
    }

    input.value = "";
}

// 🔹 Feedback Logic
function getFeedback(guess) {
    let greens = 0;
    let reds = 0;

    const secretCopy = [...secretCode];
    const guessCopy = [...guess];

    // First pass: correct color + position
    for (let i = 0; i < codeLength; i++) {
        if (guessCopy[i] === secretCopy[i]) {
            greens++;
            secretCopy[i] = null;
            guessCopy[i] = null;
        }
    }

    // Second pass: correct color wrong position
    for (let i = 0; i < codeLength; i++) {
        if (guessCopy[i] !== null) {
            const index = secretCopy.indexOf(guessCopy[i]);
            if (index !== -1) {
                reds++;
                secretCopy[index] = null;
            }
        }
    }

    return { greens, reds };
}

// 🔹 Draw Guess + Feedback
function drawGuess(guess, feedback) {
    const row = document.createElement("div");
    row.className = "guess-row";

    const oval = document.createElement("div");
    oval.className = "oval";

    guess.forEach(color => {
        const circle = document.createElement("div");
        circle.className = "circle";
        circle.style.backgroundColor = color;
        oval.appendChild(circle);
    });

    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = "feedback";

    for (let i = 0; i < feedback.greens; i++) {
        const peg = document.createElement("div");
        peg.className = "feedback-circle";
        peg.style.backgroundColor = "green";
        feedbackDiv.appendChild(peg);
    }

    for (let i = 0; i < feedback.reds; i++) {
        const peg = document.createElement("div");
        peg.className = "feedback-circle";
        peg.style.backgroundColor = "red";
        feedbackDiv.appendChild(peg);
    }

    const empty = codeLength - feedback.greens - feedback.reds;
    for (let i = 0; i < empty; i++) {
        const peg = document.createElement("div");
        peg.className = "feedback-circle";
        feedbackDiv.appendChild(peg);
    }

    row.appendChild(oval);
    row.appendChild(feedbackDiv);
    container.appendChild(row);
}

// 🔹 Win / Lose Screens
function showWin() {
    resultText.textContent = "🎉 You Win!";
    secretText.textContent = "";
    overlay.classList.remove("hidden");
}

function showLose() {
    resultText.textContent = "❌ You Lose";
    secretText.textContent = "Secret code was: " + secretCode.join(", ");
    overlay.classList.remove("hidden");
}

// 🔹 Event Listeners
button.addEventListener("click", makeGuess);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});

overlayPlayAgain.addEventListener("click", startGame);
// 🔹 Initialize Game
startGame();
});