"""
Hangman game implementation with smart features.
"""

import random
import os


def clear_screen():
    """Clear the terminal screen."""
    os.system('cls' if os.name == 'nt' else 'clear')


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
    clear_screen()
    print("\n--- HANGMAN ---")
    
    # Expanded word categories with hints
    word_categories = {
        'animals': {
            'words': ['ELEPHANT', 'GIRAFFE', 'KANGAROO', 'BUTTERFLY', 'DOLPHIN', 'CHEETAH', 'OCTOPUS', 'PELICAN'],
            'hint': 'Creatures in nature'
        },
        'countries': {
            'words': ['BRAZIL', 'JAPAN', 'EGYPT', 'GERMANY', 'CANADA', 'AUSTRALIA', 'ITALY', 'MEXICO'],
            'hint': 'Nations around the world'
        },
        'technology': {
            'words': ['COMPUTER', 'PROGRAMMING', 'ALGORITHM', 'DATABASE', 'FRAMEWORK', 'DEVELOPER', 'SOFTWARE', 'INTERNET'],
            'hint': 'Tech-related terms'
        },
        'food': {
            'words': ['PIZZA', 'SANDWICH', 'CHOCOLATE', 'HAMBURGER', 'SPAGHETTI', 'ICECREAM', 'STRAWBERRY', 'PINEAPPLE'],
            'hint': 'Edible items'
        }
    }
    
    print("Categories available:")
    for i, category in enumerate(word_categories.keys(), 1):
        print(f"{i}. {category.title()} - {word_categories[category]['hint']}")
    
    # Get category choice
    while True:
        try:
            choice = int(input(f"\nChoose a category (1-{len(word_categories)}): "))
            if 1 <= choice <= len(word_categories):
                category_name = list(word_categories.keys())[choice - 1]
                break
            else:
                print(f"Please enter a number between 1 and {len(word_categories)}.")
        except ValueError:
            print("Please enter a valid number.")
    
    selected_category = word_categories[category_name]
    word = random.choice(selected_category['words'])
    word_letters = set(word)
    guessed_letters = set()
    wrong_guesses = set()
    
    # Adaptive difficulty based on word length
    max_attempts = min(len(word) + 2, 7)  # At least 3, max 7 attempts
    attempts_left = max_attempts
    
    print(f"\nCategory: {category_name.title()}")
    print(f"Word length: {len(word)} letters")
    print(f"You have {attempts_left} attempts.")
    print(display_hangman(attempts_left))
    print(f"Word: {' '.join('_' if letter not in guessed_letters else letter for letter in word)}")
    print(f"Letters guessed: {', '.join(sorted(guessed_letters)) if guessed_letters else 'None'}")
    print(f"Wrong guesses: {', '.join(sorted(wrong_guesses)) if wrong_guesses else 'None'}")
    
    while attempts_left > 0 and word_letters != guessed_letters:
        guess = input("\nGuess a letter: ").upper()
        
        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single letter.")
            input("Press Enter to continue...")
            continue
            
        if guess in guessed_letters or guess in wrong_guesses:
            print(f"You've already guessed '{guess}'. Try a different letter.")
            input("Press Enter to continue...")
            continue
        
        if guess in word_letters:
            guessed_letters.add(guess)
            occurrences = word.count(guess)
            if occurrences == 1:
                print(f"Good job! '{guess}' appears once in the word.")
            else:
                print(f"Excellent! '{guess}' appears {occurrences} times in the word.")
        else:
            wrong_guesses.add(guess)
            attempts_left -= 1
            print(f"Sorry, '{guess}' is not in the word.")
        
        # Calculate progress percentage
        revealed_letters = sum(1 for letter in word if letter in guessed_letters)
        progress = (revealed_letters / len(word)) * 100
        
        print(display_hangman(attempts_left))
        print(f"Word: {' '.join('_' if letter not in guessed_letters else letter for letter in word)}")
        print(f"Progress: {progress:.1f}%")
        print(f"Attempts left: {attempts_left}")
        print(f"Letters guessed: {', '.join(sorted(guessed_letters)) if guessed_letters else 'None'}")
        print(f"Wrong guesses: {', '.join(sorted(wrong_guesses)) if wrong_guesses else 'None'}")
        
        # Smart feedback based on progress
        if progress > 0 and progress < 100:
            if progress < 30:
                print("Keep going! You're just getting started.")
            elif progress < 60:
                print("Nice progress! You're getting there.")
            elif progress < 90:
                print("Almost there! You can see the end.")
    
    if word_letters == guessed_letters:
        print(f"\n🎉 Congratulations! You guessed the word '{word}' with {max_attempts - attempts_left} wrong guess(es)!")
    else:
        print(f"\n💀 Game over! The word was '{word}'. Better luck next time!")
    
    input("\nPress Enter to return to the main menu...")


if __name__ == "__main__":
    hangman()