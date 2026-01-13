# Web Games Collection

A collection of smart web-based games that work on all devices (computers, tablets, and smartphones) through any web browser.

## Games Included

1. **Number Guessing Game** - Smart guessing game with adaptive difficulty levels (Easy, Medium, Hard) and intelligent hints
2. **Rock Paper Scissors** - Classic game with adaptive AI that learns from your playing patterns
3. **Tic Tac Toe** - Strategic game against an unbeatable AI using the minimax algorithm
4. **Hangman** - Word-guessing game with multiple categories, adaptive difficulty, and progress tracking

## Features

- **Cross-Device Compatibility**: Works on computers, tablets, and smartphones via web browser
- **Responsive Design**: Adapts to different screen sizes and orientations
- **Smart AI**: Advanced algorithms in Tic Tac Toe (minimax) and Rock Paper Scissors (pattern recognition)
- **Adaptive Difficulty**: Games adjust based on word length or player performance
- **Progress Tracking**: Hangman shows completion percentage, Rock Paper Scissors calculates win rates
- **Intelligent Hints**: Games provide helpful feedback based on your progress
- **User-Friendly Interface**: Clean design with intuitive navigation
- **Emoji-enhanced Feedback**: Visual indicators for better user experience

## How to Run

To run the web games collection:

1. Simply open `index.html` in any web browser
2. Or serve the files through a web server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser

## Smart Features Explained

- **Number Guessing Game**: Three difficulty levels with dynamic hints based on proximity to the answer
- **Rock Paper Scissors**: AI analyzes your move history to predict and counter your next move
- **Tic Tac Toe**: Unbeatable computer opponent using the minimax algorithm with alpha-beta pruning
- **Hangman**: Multiple word categories, adaptive attempts based on word length, and progress tracking