

 Mastermind Visual

A browser-based Mastermind game where players try to guess a hidden combination of colors. This interactive game is built with HTML, CSS, and JavaScript and runs entirely in the browser—no installation required.

 Table of Contents

 Gameplay
 Features
 Installation
 Usage
 Game Logic



 Gameplay

Mastermind is a classic code-breaking game:

1. The computer generates a **secret code** of 4 colors.
2. Available colors:
   `red, blue, green, yellow, orange, purple`
3. Players enter guesses in the input field, separated by commas, e.g., `red, blue, green, yellow`.
4. After each guess, the game provides feedback:

   Green peg: Correct color in the correct position.
   Red peg Correct color but in the wrong position.
   Gray peg: Color not in the secret code.
5. Players have 6 attempts to guess the code correctly.
6. At the end, an overlay displays the result and reveals the secret code if the player loses.


Features

Fully playable in a browser with no dependencies.
Input validation for correct number and type of colors.
Interactive feedback using colored pegs.
Responsive overlay for win or lose messages.
Option to restart the game by clicking the "Play Again" button.


 Installation

1. Clone the repository:

```bash
git clone https://github.com/Logan-Ik/mastermind-game.git
```

2. Navigate to the project folder:

```bash
cd mastermind-game
```

3. Open `index.html` in a web browser


 Usage

1. Open the game in your browser.
2. Type your guess using comma-separated colors in the input field.
3. Click Make Guess to submit your guess.
4. Review the feedback pegs for guidance: green = correct, red = correct color wrong place, gray = not in code.
5. Continue guessing until you either win or reach 6 attempts.
6. The overlay displays the game result. Click **Play Again** to restart.


 Game Logic

Secret Code Generation: Randomly selects 4 colors from the 6 available.
Feedback Calculation:

  1. Count exact matches (correct color and position → green pegs).
  2. Count partial matches (correct color but wrong position → red pegs).
  3. Remaining slots filled with gray pegs.
  Attempts Limitation: Maximum of 6 guesses per game.
  Win/Lose Condition:

   Player wins if all 4 pegs are green.
   Player loses if attempts reach 6 without a full match
