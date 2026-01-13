// Game state variables
let gameState = {
    // Number Guessing Game
    numberGuessing: {
        secretNumber: 0,
        maxNum: 0,
        attemptsLimit: 0,
        attempts: 0,
        previousGuesses: [],
        difficulty: ''
    },
    
    // Rock Paper Scissors
    rps: {
        playerScore: 0,
        computerScore: 0,
        roundsPlayed: 0,
        playerHistory: [],
        choices: { r: 'rock', p: 'paper', s: 'scissors' },
        choiceBeats: { r: 's', p: 'r', s: 'p' } // What each choice beats
    },
    
    // Tic Tac Toe
    ttt: {
        board: Array(9).fill(' '),
        currentPlayer: 'X',
        gameOver: false
    },
    
    // Hangman
    hangman: {
        word: '',
        wordLetters: new Set(),
        guessedLetters: new Set(),
        wrongGuesses: new Set(),
        maxAttempts: 0,
        attemptsLeft: 0,
        category: '',
        wordCategories: {
            animals: {
                words: ['ELEPHANT', 'GIRAFFE', 'KANGAROO', 'BUTTERFLY', 'DOLPHIN', 'CHEETAH', 'OCTOPUS', 'PELICAN'],
                hint: 'Creatures in nature'
            },
            countries: {
                words: ['BRAZIL', 'JAPAN', 'EGYPT', 'GERMANY', 'CANADA', 'AUSTRALIA', 'ITALY', 'MEXICO'],
                hint: 'Nations around the world'
            },
            technology: {
                words: ['COMPUTER', 'PROGRAMMING', 'ALGORITHM', 'DATABASE', 'FRAMEWORK', 'DEVELOPER', 'SOFTWARE', 'INTERNET'],
                hint: 'Tech-related terms'
            },
            food: {
                words: ['PIZZA', 'SANDWICH', 'CHOCOLATE', 'HAMBURGER', 'SPAGHETTI', 'ICECREAM', 'STRAWBERRY', 'PINEAPPLE'],
                hint: 'Edible items'
            }
        }
    }
};

// DOM Elements
const mainMenu = document.getElementById('main-menu');
const gameArea = document.getElementById('game-area');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    // Game selection buttons
    const gameButtons = document.querySelectorAll('.game-btn');
    gameButtons.forEach(button => {
        button.addEventListener('click', () => {
            const gameType = button.getAttribute('data-game');
            showGame(gameType);
        });
    });
}

function showGame(gameType) {
    mainMenu.style.display = 'none';
    gameArea.innerHTML = '';
    gameArea.style.display = 'block';
    
    switch(gameType) {
        case 'guessing':
            showNumberGuessingGame();
            break;
        case 'rps':
            showRockPaperScissors();
            break;
        case 'tictactoe':
            showTicTacToe();
            break;
        case 'hangman':
            showHangman();
            break;
    }
}

function goBackToMenu() {
    gameArea.style.display = 'none';
    mainMenu.style.display = 'block';
    
    // Reset game states
    resetGameState();
}

function resetGameState() {
    // Reset number guessing
    gameState.numberGuessing = {
        secretNumber: 0,
        maxNum: 0,
        attemptsLimit: 0,
        attempts: 0,
        previousGuesses: [],
        difficulty: ''
    };
    
    // Reset RPS
    gameState.rps = {
        playerScore: 0,
        computerScore: 0,
        roundsPlayed: 0,
        playerHistory: [],
        choices: { r: 'rock', p: 'paper', s: 'scissors' },
        choiceBeats: { r: 's', p: 'r', s: 'p' }
    };
    
    // Reset Tic Tac Toe
    gameState.ttt = {
        board: Array(9).fill(' '),
        currentPlayer: 'X',
        gameOver: false
    };
    
    // Reset Hangman
    gameState.hangman = {
        word: '',
        wordLetters: new Set(),
        guessedLetters: new Set(),
        wrongGuesses: new Set(),
        maxAttempts: 0,
        attemptsLeft: 0,
        category: '',
        wordCategories: gameState.hangman.wordCategories
    };
}

// Number Guessing Game Implementation
function showNumberGuessingGame() {
    gameArea.innerHTML = `
        <div class="game-area guessing-game">
            <button class="back-btn" onclick="goBackToMenu()">← Back to Menu</button>
            <h2>🔢 Number Guessing Game</h2>
            <div id="difficulty-selection">
                <h3>Choose Difficulty:</h3>
                <div class="difficulty-options">
                    <div class="difficulty-option" data-difficulty="easy">
                        <strong>Easy</strong> (1-50, unlimited attempts)<br>
                        <small>Perfect for beginners</small>
                    </div>
                    <div class="difficulty-option" data-difficulty="medium">
                        <strong>Medium</strong> (1-100, 10 attempts)<br>
                        <small>Standard challenge</small>
                    </div>
                    <div class="difficulty-option" data-difficulty="hard">
                        <strong>Hard</strong> (1-200, 8 attempts)<br>
                        <small>For experts only</small>
                    </div>
                </div>
            </div>
            <div id="game-play" style="display: none;">
                <div class="attempts-info">
                    <p>Attempts: <span id="attempts-count">0</span><span id="attempts-limit"></span></p>
                    <p>Range: 1 to <span id="max-num">0</span></p>
                </div>
                <div class="guessing-input">
                    <input type="number" id="guess-input" placeholder="Enter your guess..." min="1" max="200">
                    <button id="submit-guess">Submit</button>
                </div>
                <div id="feedback" class="feedback" style="display: none;"></div>
                <div id="previous-guesses" style="margin-top: 15px; text-align: center;"></div>
            </div>
        </div>
    `;
    
    // Add event listeners for difficulty selection
    document.querySelectorAll('.difficulty-option').forEach(option => {
        option.addEventListener('click', () => {
            const difficulty = option.getAttribute('data-difficulty');
            
            // Update UI to show selected
            document.querySelectorAll('.difficulty-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            option.classList.add('selected');
            
            // Start game with selected difficulty
            setTimeout(() => {
                startNumberGuessingGame(difficulty);
            }, 300);
        });
    });
}

function startNumberGuessingGame(difficulty) {
    const difficultySelection = document.getElementById('difficulty-selection');
    const gamePlay = document.getElementById('game-play');
    
    // Set up game based on difficulty
    switch(difficulty) {
        case 'easy':
            gameState.numberGuessing.secretNumber = Math.floor(Math.random() * 50) + 1;
            gameState.numberGuessing.maxNum = 50;
            gameState.numberGuessing.attemptsLimit = Infinity; // Unlimited
            gameState.numberGuessing.difficulty = 'easy';
            break;
        case 'medium':
            gameState.numberGuessing.secretNumber = Math.floor(Math.random() * 100) + 1;
            gameState.numberGuessing.maxNum = 100;
            gameState.numberGuessing.attemptsLimit = 10;
            gameState.numberGuessing.difficulty = 'medium';
            break;
        case 'hard':
            gameState.numberGuessing.secretNumber = Math.floor(Math.random() * 200) + 1;
            gameState.numberGuessing.maxNum = 200;
            gameState.numberGuessing.attemptsLimit = 8;
            gameState.numberGuessing.difficulty = 'hard';
            break;
    }
    
    // Update UI elements
    document.getElementById('max-num').textContent = gameState.numberGuessing.maxNum;
    
    if (gameState.numberGuessing.attemptsLimit !== Infinity) {
        document.getElementById('attempts-limit').textContent = ` / ${gameState.numberGuessing.attemptsLimit}`;
    } else {
        document.getElementById('attempts-limit').textContent = ' (unlimited)';
    }
    
    difficultySelection.style.display = 'none';
    gamePlay.style.display = 'block';
    
    // Add event listener for submit button
    document.getElementById('submit-guess').addEventListener('click', processGuess);
    
    // Also allow Enter key to submit
    document.getElementById('guess-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processGuess();
        }
    });
}

function processGuess() {
    const input = document.getElementById('guess-input');
    const guess = parseInt(input.value);
    
    if (isNaN(guess) || guess < 1 || guess > gameState.numberGuessing.maxNum) {
        showFeedback(`Please enter a number between 1 and ${gameState.numberGuessing.maxNum}.`, 'error');
        return;
    }
    
    // Add to previous guesses
    gameState.numberGuessing.previousGuesses.push(guess);
    gameState.numberGuessing.attempts++;
    
    // Update attempts count
    document.getElementById('attempts-count').textContent = gameState.numberGuessing.attempts;
    
    // Show previous guesses
    updatePreviousGuesses();
    
    if (guess === gameState.numberGuessing.secretNumber) {
        // Player won
        const message = `🎉 Congratulations! You guessed the number in ${gameState.numberGuessing.attempts} attempts!`;
        showFeedback(message, 'success');
        
        // Calculate and show score rating
        let ratingMessage = '';
        if (gameState.numberGuessing.attempts === 1) {
            ratingMessage = "Perfect! You're a mind reader! 😲";
        } else if (gameState.numberGuessing.attempts <= 3) {
            ratingMessage = "Amazing! That was very quick! 🌟";
        } else if (gameState.numberGuessing.attempts <= 5) {
            ratingMessage = "Great job! You're very good at this! 👍";
        } else if (gameState.numberGuessing.attempts <= 8) {
            ratingMessage = "Nice work! You got there! 👌";
        } else {
            ratingMessage = "Well done for persevering! 🙌";
        }
        
        // Add rating message after a short delay
        setTimeout(() => {
            showFeedback(ratingMessage, 'success');
        }, 1000);
        
        // Disable input after winning
        document.getElementById('guess-input').disabled = true;
        document.getElementById('submit-guess').disabled = true;
        
    } else {
        // Give smart hint based on proximity
        const diff = Math.abs(gameState.numberGuessing.secretNumber - guess);
        let hint = '';
        
        if (diff <= 5) {
            hint = guess < gameState.numberGuessing.secretNumber ? 
                "Very close! Just a little higher! 🔥" : 
                "Very close! Just a little lower! 🔥";
        } else if (diff <= 15) {
            hint = guess < gameState.numberGuessing.secretNumber ? 
                "Close! Try higher! 📈" : 
                "Close! Try lower! 📉";
        } else {
            hint = guess < gameState.numberGuessing.secretNumber ? 
                "Too low! Try a higher number. 📉" : 
                "Too high! Try a lower number. 📈";
        }
        
        // Provide pattern hint if applicable
        if (gameState.numberGuessing.previousGuesses.length > 1) {
            const lastGuess = gameState.numberGuessing.previousGuesses[gameState.numberGuessing.previousGuesses.length - 1];
            const secondLastGuess = gameState.numberGuessing.previousGuesses[gameState.numberGuessing.previousGuesses.length - 2];
            
            if ((lastGuess > secondLastGuess && guess > gameState.numberGuessing.secretNumber && secondLastGuess > gameState.numberGuessing.secretNumber) ||
                (lastGuess < secondLastGuess && guess < gameState.numberGuessing.secretNumber && secondLastGuess < gameState.numberGuessing.secretNumber)) {
                hint += " You're getting further from the target! 🎯";
            }
        }
        
        showFeedback(hint, 'warning');
    }
    
    // Check if attempts limit reached
    if (gameState.numberGuessing.attempts >= gameState.numberGuessing.attemptsLimit && gameState.numberGuessing.attemptsLimit !== Infinity) {
        const message = `💀 Game over! The number was ${gameState.numberGuessing.secretNumber}. Better luck next time!`;
        showFeedback(message, 'error');
        
        // Disable input after losing
        document.getElementById('guess-input').disabled = true;
        document.getElementById('submit-guess').disabled = true;
    }
    
    // Clear input
    input.value = '';
    input.focus();
}

function showFeedback(message, type) {
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback ${type}`;
    feedbackEl.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        feedbackEl.style.display = 'none';
    }, 5000);
}

function updatePreviousGuesses() {
    const container = document.getElementById('previous-guesses');
    if (gameState.numberGuessing.previousGuesses.length > 0) {
        container.innerHTML = `<small>Previous guesses: ${gameState.numberGuessing.previousGuesses.join(', ')}</small>`;
    }
}

// Rock Paper Scissors Implementation
function showRockPaperScissors() {
    gameArea.innerHTML = `
        <div class="game-area rps-game">
            <button class="back-btn" onclick="goBackToMenu()">← Back to Menu</button>
            <h2>✊✋✌️ Rock Paper Scissors</h2>
            <div class="score-board">
                <div>You: <span id="player-score">0</span></div>
                <div>Rounds: <span id="rounds-played">0</span></div>
                <div>Computer: <span id="computer-score">0</span></div>
            </div>
            <div class="choices">
                <button class="choice-btn" data-choice="r">✊</button>
                <button class="choice-btn" data-choice="p">✋</button>
                <button class="choice-btn" data-choice="s">✌️</button>
            </div>
            <div class="results">
                <div id="current-round-result" style="font-size: 1.5rem; margin: 20px 0;"></div>
                <div id="choices-display" style="font-size: 1.2rem; margin: 10px 0;"></div>
            </div>
            <div id="final-results" style="display: none; text-align: center; margin-top: 20px;"></div>
        </div>
    `;
    
    // Add event listeners for choices
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const playerChoice = e.target.getAttribute('data-choice');
            playRPSRound(playerChoice);
        });
    });
}

function playRPSRound(playerChoice) {
    if (gameState.rps.gameOver) return;
    
    // Add player choice to history
    gameState.rps.playerHistory.push(playerChoice);
    gameState.rps.roundsPlayed++;
    
    // Smart AI: predict player's next move based on patterns
    let computerChoice;
    
    if (gameState.rps.playerHistory.length >= 2) {
        // Simple pattern recognition
        const lastMove = gameState.rps.playerHistory[gameState.rps.playerHistory.length - 1];
        const secondLast = gameState.rps.playerHistory[gameState.rps.playerHistory.length - 2];
        
        if (lastMove === secondLast) {
            // If player repeated, predict they'll continue the pattern
            computerChoice = gameState.rps.choiceBeats[lastMove];
        } else if (gameState.rps.playerHistory.length >= 3) {
            // Look for simple patterns in last 3 moves
            const thirdLast = gameState.rps.playerHistory[gameState.rps.playerHistory.length - 3];
            
            if (thirdLast === secondLast && secondLast !== lastMove) {
                // If pattern is AAB, predict A again
                computerChoice = gameState.rps.choiceBeats[thirdLast];
            } else {
                // Use frequency analysis of last 5 moves
                const recentMoves = gameState.rps.playerHistory.slice(-5);
                const counts = {};
                recentMoves.forEach(move => {
                    counts[move] = (counts[move] || 0) + 1;
                });
                
                let maxCount = 0;
                let predictedPlayerMove = lastMove; // fallback
                
                for (const [move, count] of Object.entries(counts)) {
                    if (count > maxCount) {
                        maxCount = count;
                        predictedPlayerMove = move;
                    }
                }
                
                computerChoice = gameState.rps.choiceBeats[predictedPlayerMove];
            }
        } else {
            // For early moves, make educated guess
            computerChoice = gameState.rps.choiceBeats[lastMove];
        }
    } else {
        // For first moves, make random choice
        computerChoice = ['r', 'p', 's'][Math.floor(Math.random() * 3)];
    }
    
    // Determine winner
    let result;
    if (playerChoice === computerChoice) {
        result = 'tie';
    } else if (gameState.rps.choiceBeats[playerChoice] === computerChoice) {
        result = 'player';
        gameState.rps.playerScore++;
    } else {
        result = 'computer';
        gameState.rps.computerScore++;
    }
    
    // Update display
    updateRPSDisplay(result, playerChoice, computerChoice);
}

function updateRPSDisplay(result, playerChoice, computerChoice) {
    // Update scores
    document.getElementById('player-score').textContent = gameState.rps.playerScore;
    document.getElementById('computer-score').textContent = gameState.rps.computerScore;
    document.getElementById('rounds-played').textContent = gameState.rps.roundsPlayed;
    
    // Show choices
    const choicesDisplay = document.getElementById('choices-display');
    choicesDisplay.innerHTML = `You: ${gameState.rps.choices[playerChoice]} | Computer: ${gameState.rps.choices[computerChoice]}`;
    
    // Show result
    const resultElement = document.getElementById('current-round-result');
    let resultText = '';
    
    if (result === 'tie') {
        resultText = "It's a tie!";
    } else if (result === 'player') {
        resultText = "You win this round! 🏆";
    } else {
        resultText = "Computer wins this round! 💻";
    }
    
    resultElement.textContent = resultText;
    
    // Check if player wants to quit after 5 rounds (for demo purposes)
    if (gameState.rps.roundsPlayed % 10 === 0) {
        setTimeout(() => {
            if (confirm("Do you want to continue playing? (Click Cancel to see final results)")) {
                // Continue playing
            } else {
                showRPSFinalResults();
            }
        }, 1000);
    }
}

function showRPSFinalResults() {
    gameState.rps.gameOver = true;
    
    const finalResults = document.getElementById('final-results');
    finalResults.style.display = 'block';
    
    let winPercentage = 0;
    if (gameState.rps.roundsPlayed > 0) {
        winPercentage = (gameState.rps.playerScore / gameState.rps.roundsPlayed) * 100;
    }
    
    let performanceMessage = '';
    if (winPercentage > 60) {
        performanceMessage = "🎉 Excellent! You dominated the game!";
    } else if (winPercentage > 50) {
        performanceMessage = "👍 Good job! You played well!";
    } else if (winPercentage === 50) {
        performanceMessage = "🤝 Even match! You're evenly matched!";
    } else if (winPercentage > 40) {
        performanceMessage = "😊 Not bad! Keep practicing!";
    } else {
        performanceMessage = "💪 Keep trying! Practice makes perfect!";
    }
    
    finalResults.innerHTML = `
        <h3>📊 FINAL RESULTS</h3>
        <p>You: ${gameState.rps.playerScore} | Computer: ${gameState.rps.computerScore} | Rounds: ${gameState.rps.roundsPlayed}</p>
        <p>Your win rate: ${winPercentage.toFixed(1)}%</p>
        <p>${performanceMessage}</p>
        <button class="back-btn" onclick="goBackToMenu()" style="margin-top: 20px;">← Back to Menu</button>
    `;
}

// Tic Tac Toe Implementation
function showTicTacToe() {
    gameArea.innerHTML = `
        <div class="game-area ttt-game">
            <button class="back-btn" onclick="goBackToMenu()">← Back to Menu</button>
            <h2>❌⭕ Tic Tac Toe</h2>
            <div class="instructions">
                <p>You are ❌, Computer is ⭕</p>
                <p>Click on any square to place your mark!</p>
            </div>
            <div class="status" id="status">Your turn! Place an ❌</div>
            <div class="board" id="board"></div>
            <div style="text-align: center; margin-top: 20px;">
                <button id="reset-btn">Reset Game</button>
            </div>
        </div>
    `;
    
    renderTTTBoard();
    
    // Add event listeners for cells
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.addEventListener('click', () => handleTTTCellClick(i));
    }
    
    // Add event listener for reset button
    document.getElementById('reset-btn').addEventListener('click', resetTTTGame);
}

function renderTTTBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.id = `cell-${i}`;
        cell.className = 'cell';
        cell.textContent = gameState.ttt.board[i] === 'X' ? '❌' : 
                          gameState.ttt.board[i] === 'O' ? '⭕' : '';
        
        if (gameState.ttt.board[i] !== ' ' || gameState.ttt.gameOver) {
            cell.classList.add('disabled');
        }
        
        boardElement.appendChild(cell);
    }
}

function handleTTTCellClick(index) {
    // Check if cell is empty and game is not over
    if (gameState.ttt.board[index] !== ' ' || gameState.ttt.gameOver) {
        return;
    }
    
    // Make player move
    makeTTTMove(index, 'X');
    
    // Check if game is over after player move
    const result = checkTTTWinner();
    if (result) {
        handleTTTGameOver(result);
        return;
    }
    
    // Computer's turn
    setTimeout(() => {
        if (!gameState.ttt.gameOver) {
            document.getElementById('status').textContent = 'Computer is thinking...';
            
            // Use minimax to find best move for computer
            setTimeout(() => {
                const bestMove = findTTTBestMove();
                makeTTTMove(bestMove, 'O');
                
                // Check if game is over after computer move
                const result = checkTTTWinner();
                if (result) {
                    handleTTTGameOver(result);
                } else {
                    document.getElementById('status').textContent = 'Your turn! Place an ❌';
                }
            }, 800); // Simulate thinking time
        }
    }, 500);
}

function makeTTTMove(index, player) {
    gameState.ttt.board[index] = player;
    renderTTTBoard();
}

function checkTTTWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState.ttt.board[a] !== ' ' &&
            gameState.ttt.board[a] === gameState.ttt.board[b] &&
            gameState.ttt.board[a] === gameState.ttt.board[c]) {
            return gameState.ttt.board[a]; // Return the winning player
        }
    }
    
    // Check for draw
    if (!gameState.ttt.board.includes(' ')) {
        return 'Draw';
    }
    
    return null; // No winner yet
}

function minimax(board, depth, isMaximizing) {
    const winner = checkTTTWinnerOnBoard(board);
    
    if (winner === 'O') return 1;      // Computer wins
    if (winner === 'X') return -1;     // Player wins
    if (winner === 'Draw') return 0;   // Draw
    
    if (isMaximizing) {
        let bestVal = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === ' ') {
                board[i] = 'O';
                const val = minimax(board, depth + 1, false);
                board[i] = ' ';
                bestVal = Math.max(bestVal, val);
            }
        }
        return bestVal;
    } else {
        let bestVal = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === ' ') {
                board[i] = 'X';
                const val = minimax(board, depth + 1, true);
                board[i] = ' ';
                bestVal = Math.min(bestVal, val);
            }
        }
        return bestVal;
    }
}

function checkTTTWinnerOnBoard(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== ' ' &&
            board[a] === board[b] &&
            board[a] === board[c]) {
            return board[a];
        }
    }
    
    if (!board.includes(' ')) return 'Draw';
    return null;
}

function findTTTBestMove() {
    let bestVal = -Infinity;
    let bestMove = -1;
    
    for (let i = 0; i < 9; i++) {
        if (gameState.ttt.board[i] === ' ') {
            gameState.ttt.board[i] = 'O';
            const moveVal = minimax(gameState.ttt.board, 0, false);
            gameState.ttt.board[i] = ' ';
            
            if (moveVal > bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    
    return bestMove;
}

function handleTTTGameOver(result) {
    gameState.ttt.gameOver = true;
    
    if (result === 'X') {
        document.getElementById('status').innerHTML = '<span style="color: green;">Congratulations! You win! 🎉</span>';
    } else if (result === 'O') {
        document.getElementById('status').innerHTML = '<span style="color: red;">Computer wins! Better luck next time! 💻</span>';
    } else {
        document.getElementById('status').innerHTML = '<span style="color: orange;">It\'s a draw! 🤝</span>';
    }
}

function resetTTTGame() {
    gameState.ttt = {
        board: Array(9).fill(' '),
        currentPlayer: 'X',
        gameOver: false
    };
    
    document.getElementById('status').textContent = 'Your turn! Place an ❌';
    renderTTTBoard();
    
    // Re-add event listeners
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.addEventListener('click', () => handleTTTCellClick(i));
    }
}

// Hangman Implementation
function showHangman() {
    gameArea.innerHTML = `
        <div class="game-area hangman-game">
            <button class="back-btn" onclick="goBackToMenu()">← Back to Menu</button>
            <h2> gallows Hangman</h2>
            <div id="category-selection">
                <h3>Select a Category:</h3>
                <div class="categories" id="categories-container">
                    <!-- Categories will be added here -->
                </div>
            </div>
            <div id="game-area-hangman" style="display: none;">
                <div class="hangman-drawing" id="hangman-drawing"></div>
                <div class="hangman-display" id="word-display">_ _ _ _ _</div>
                <div class="progress-bar">
                    <div class="progress" id="progress-bar"></div>
                </div>
                <div class="attempts-info">
                    Attempts left: <span id="attempts-left">6</span> | Progress: <span id="progress-percent">0</span>%
                </div>
                <div class="guess-input">
                    <input type="text" id="letter-input" maxlength="1" placeholder="Letter" autocomplete="off">
                    <button id="submit-letter">Guess</button>
                </div>
                <div class="guesses-display">
                    <div>Guessed letters: <span id="guessed-letters">None</span></div>
                    <div>Wrong guesses: <span id="wrong-guesses">None</span></div>
                </div>
                <div id="hangman-feedback" style="margin-top: 15px; text-align: center;"></div>
            </div>
        </div>
    `;
    
    // Populate categories
    const container = document.getElementById('categories-container');
    Object.keys(gameState.hangman.wordCategories).forEach((category, index) => {
        const catData = gameState.hangman.wordCategories[category];
        const catBtn = document.createElement('div');
        catBtn.className = 'category-btn';
        catBtn.setAttribute('data-category', category);
        catBtn.innerHTML = `
            <strong>${category.charAt(0).toUpperCase() + category.slice(1)}</strong><br>
            <small>${catData.hint}</small>
        `;
        catBtn.addEventListener('click', () => {
            // Mark as selected
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            catBtn.classList.add('selected');
            
            // Start game with this category
            setTimeout(() => {
                startHangmanGame(category);
            }, 300);
        });
        container.appendChild(catBtn);
    });
}

function startHangmanGame(categoryName) {
    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('game-area-hangman').style.display = 'block';
    
    // Select a random word from the chosen category
    const category = gameState.hangman.wordCategories[categoryName];
    gameState.hangman.word = category.words[Math.floor(Math.random() * category.words.length)];
    gameState.hangman.wordLetters = new Set(gameState.hangman.word);
    gameState.hangman.category = categoryName;
    
    // Adaptive difficulty based on word length
    gameState.hangman.maxAttempts = Math.min(gameState.hangman.word.length + 2, 7);
    gameState.hangman.attemptsLeft = gameState.hangman.maxAttempts;
    
    // Update UI
    document.getElementById('attempts-left').textContent = gameState.hangman.attemptsLeft;
    document.querySelector('#hangman-game h3').innerHTML = `Category: <strong>${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</strong> (${gameState.hangman.word.length} letters)`;
    
    // Render initial state
    renderHangman();
    
    // Add event listeners
    document.getElementById('submit-letter').addEventListener('click', makeHangmanGuess);
    document.getElementById('letter-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            makeHangmanGuess();
        }
    });
}

function renderHangman() {
    // Display word with blanks
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = gameState.hangman.word.split('').map(letter => 
        gameState.hangman.guessedLetters.has(letter) ? letter : '_'
    ).join(' ');
    
    // Update hangman drawing
    document.getElementById('hangman-drawing').textContent = getHangmanDrawing(gameState.hangman.maxAttempts - gameState.hangman.attemptsLeft);
    
    // Update attempts
    document.getElementById('attempts-left').textContent = gameState.hangman.attemptsLeft;
    
    // Update progress
    const revealedLetters = [...gameState.hangman.word].filter(letter => gameState.hangman.guessedLetters.has(letter)).length;
    const progressPercent = Math.round((revealedLetters / gameState.hangman.word.length) * 100);
    document.getElementById('progress-percent').textContent = progressPercent;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    
    // Update guessed letters display
    const guessedText = gameState.hangman.guessedLetters.size > 0 ? 
        Array.from(gameState.hangman.guessedLetters).sort().join(', ') : 'None';
    document.getElementById('guessed-letters').textContent = guessedText;
    
    const wrongText = gameState.hangman.wrongGuesses.size > 0 ? 
        Array.from(gameState.hangman.wrongGuesses).sort().join(', ') : 'None';
    document.getElementById('wrong-guesses').textContent = wrongText;
    
    // Smart feedback based on progress
    const feedbackEl = document.getElementById('hangman-feedback');
    if (progressPercent > 0 && progressPercent < 100) {
        if (progressPercent < 30) {
            feedbackEl.textContent = "Keep going! You're just getting started.";
            feedbackEl.style.color = "#007bff";
        } else if (progressPercent < 60) {
            feedbackEl.textContent = "Nice progress! You're getting there.";
            feedbackEl.style.color = "#28a745";
        } else if (progressPercent < 90) {
            feedbackEl.textContent = "Almost there! You can see the end.";
            feedbackEl.style.color = "#fd7e14";
        } else {
            feedbackEl.textContent = "So close! Don't give up now!";
            feedbackEl.style.color = "#ffc107";
        }
    } else if (progressPercent === 100) {
        feedbackEl.innerHTML = `<span style="color: #28a745; font-weight: bold; font-size: 1.2em;">🎉 Congratulations! You guessed the word '${gameState.hangman.word}'!</span>`;
    } else {
        feedbackEl.textContent = "";
    }
    
    // Check for win/loss
    if (gameState.hangman.wordLetters.size === gameState.hangman.guessedLetters.size) {
        // Player won
        setTimeout(() => {
            alert(`🎉 Congratulations! You guessed the word '${gameState.hangman.word}'!`);
        }, 500);
    } else if (gameState.hangman.attemptsLeft <= 0) {
        // Player lost
        setTimeout(() => {
            alert(`💀 Game over! The word was '${gameState.hangman.word}'. Better luck next time!`);
        }, 500);
    }
}

function makeHangmanGuess() {
    const input = document.getElementById('letter-input');
    const guess = input.value.toUpperCase();
    
    if (!guess || guess.length !== 1 || !guess.match(/[A-Z]/)) {
        alert("Please enter a single letter.");
        return;
    }
    
    // Check if already guessed
    if (gameState.hangman.guessedLetters.has(guess) || gameState.hangman.wrongGuesses.has(guess)) {
        alert(`You've already guessed '${guess}'. Try a different letter.`);
        input.value = '';
        return;
    }
    
    // Process the guess
    if (gameState.hangman.word.includes(guess)) {
        gameState.hangman.guessedLetters.add(guess);
        const occurrences = gameState.hangman.word.split(guess).length - 1;
        
        if (occurrences === 1) {
            alert(`Good job! '${guess}' appears once in the word.`);
        } else {
            alert(`Excellent! '${guess}' appears ${occurrences} times in the word.`);
        }
    } else {
        gameState.hangman.wrongGuesses.add(guess);
        gameState.hangman.attemptsLeft--;
        alert(`Sorry, '${guess}' is not in the word.`);
    }
    
    // Clear input and render updated state
    input.value = '';
    renderHangman();
}

function getHangmanDrawing(stage) {
    const stages = [
        `
           ------
           |    |
           |    
           |    
           |    
           |
        --------
        `,
        `
           ------
           |    |
           |    O
           |    
           |    
           |
        --------
        `,
        `
           ------
           |    |
           |    O
           |    |
           |    
           |
        --------
        `,
        `
           ------
           |    |
           |    O
           |   /|
           |    
           |
        --------
        `,
        `
           ------
           |    |
           |    O
           |   /|\\
           |    
           |
        --------
        `,
        `
           ------
           |    |
           |    O
           |   /|\\
           |   /
           |
        --------
        `,
        `
           ------
           |    |
           |    O
           |   /|\\
           |   / \\
           |
        --------
        `
    ];
    
    return stages[stage] || stages[0];
}