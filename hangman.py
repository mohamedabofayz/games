"""
Hangman game implementation.
"""

import random


def display_hangman(attempts_left):
    """Display the hangman drawing based on remaining attempts."""
    stages = [
        """
           ------
           |    |
           |    O
           |   /|\\
           |   / \\
           |
        --------
        """,
        """
           ------
           |    |
           |    O
           |   /|\\
           |   /
           |
        --------
        """,
        """
           ------
           |    |
           |    O
           |   /|\\
           |
           |
        --------
        """,
        """
           ------
           |    |
           |    O
           |   /|
           |
           |
        --------
        """,
        """
           ------
           |    |
           |    O
           |    |
           |
           |
        --------
        """,
        """
           ------
           |    |
           |    O
           |
           |
           |
        --------
        """,
        """
           ------
           |    |
           |
           |
           |
           |
        --------
        """
    ]
    return stages[attempts_left]


def hangman():
    """Main function to play Hangman."""
    print("\n--- HANGMAN ---")
    
    # List of possible words
    words = [
        'PYTHON', 'COMPUTER', 'PROGRAMMING', 'DEVELOPER', 'ALGORITHM',
        'FUNCTION', 'VARIABLE', 'STRING', 'INTEGER', 'BOOLEAN',
        'LIST', 'DICTIONARY', 'ITERATION', 'CONDITIONAL', 'MODULE',
        'FRAMEWORK', 'DATABASE', 'INTERFACE', 'KEYBOARD', 'MONITOR'
    ]
    
    word = random.choice(words)
    word_letters = set(word)
    guessed_letters = set()
    wrong_guesses = set()
    max_attempts = 6
    attempts_left = max_attempts
    
    print(display_hangman(attempts_left))
    print(f"Word: {' '.join('_' if letter not in guessed_letters else letter for letter in word)}")
    print(f"Attempts left: {attempts_left}")
    print(f"Wrong guesses: {', '.join(sorted(wrong_guesses)) if wrong_guesses else 'None'}")
    
    while attempts_left > 0 and word_letters != guessed_letters:
        guess = input("\nGuess a letter: ").upper()
        
        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single letter.")
            continue
            
        if guess in guessed_letters or guess in wrong_guesses:
            print(f"You've already guessed '{guess}'. Try a different letter.")
            continue
        
        if guess in word_letters:
            guessed_letters.add(guess)
            print(f"Good job! '{guess}' is in the word.")
        else:
            wrong_guesses.add(guess)
            attempts_left -= 1
            print(f"Sorry, '{guess}' is not in the word.")
        
        print(display_hangman(attempts_left))
        print(f"Word: {' '.join('_' if letter not in guessed_letters else letter for letter in word)}")
        print(f"Attempts left: {attempts_left}")
        print(f"Wrong guesses: {', '.join(sorted(wrong_guesses)) if wrong_guesses else 'None'}")
    
    if word_letters == guessed_letters:
        print(f"\nCongratulations! You guessed the word '{word}'!")
    else:
        print(f"\nGame over! The word was '{word}'.")
    
    input("\nPress Enter to return to the main menu...")


if __name__ == "__main__":
    hangman()