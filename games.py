#!/usr/bin/env python3
"""
Main module for the games collection.
This program provides a menu of simple console games to play.
"""

import os
import sys
from typing import Callable


def clear_screen():
    """Clear the terminal screen."""
    os.system('cls' if os.name == 'nt' else 'clear')


def display_menu():
    """Display the main menu."""
    print("=" * 50)
    print("           GAMES COLLECTION")
    print("=" * 50)
    print("Select a game to play:")
    print("1. Number Guessing Game")
    print("2. Rock Paper Scissors")
    print("3. Tic Tac Toe")
    print("4. Hangman")
    print("5. Exit")
    print("=" * 50)


def number_guessing_game():
    """Simple number guessing game."""
    import random
    
    print("\n--- NUMBER GUESSING GAME ---")
    print("I'm thinking of a number between 1 and 100.")
    
    secret_number = random.randint(1, 100)
    attempts = 0
    
    while True:
        try:
            guess = int(input(f"Attempt {attempts + 1}: Enter your guess: "))
            attempts += 1
            
            if guess < secret_number:
                print("Too low! Try a higher number.")
            elif guess > secret_number:
                print("Too high! Try a lower number.")
            else:
                print(f"Congratulations! You guessed the number in {attempts} attempts!")
                break
        except ValueError:
            print("Please enter a valid number.")
    
    input("\nPress Enter to return to the main menu...")


def rock_paper_scissors():
    """Rock paper scissors game."""
    import random
    
    print("\n--- ROCK PAPER SCISSORS ---")
    print("Choose: (R)ock, (P)aper, (S)cissors, or (Q)uit")
    
    choices = {'r': 'rock', 'p': 'paper', 's': 'scissors'}
    player_score = 0
    computer_score = 0
    
    while True:
        player_choice = input("\nEnter your choice: ").lower()
        
        if player_choice == 'q':
            break
        
        if player_choice not in choices:
            print("Invalid choice. Please enter R, P, S, or Q.")
            continue
        
        computer_choice = random.choice(list(choices.keys()))
        
        print(f"You chose: {choices[player_choice]}")
        print(f"Computer chose: {choices[computer_choice]}")
        
        # Determine winner
        if player_choice == computer_choice:
            print("It's a tie!")
        elif (player_choice == 'r' and computer_choice == 's') or \
             (player_choice == 'p' and computer_choice == 'r') or \
             (player_choice == 's' and computer_choice == 'p'):
            print("You win this round!")
            player_score += 1
        else:
            print("Computer wins this round!")
            computer_score += 1
        
        print(f"Score - You: {player_score}, Computer: {computer_score}")
    
    print(f"\nFinal Score - You: {player_score}, Computer: {computer_score}")
    input("\nPress Enter to return to the main menu...")


def tic_tac_toe():
    """Tic-tac-toe game."""
    from tic_tac_toe import tic_tac_toe as ttt_game
    ttt_game()


def hangman():
    """Hangman game."""
    from hangman import hangman as hangman_game
    hangman_game()


def main():
    """Main function to run the games collection."""
    games = {
        1: number_guessing_game,
        2: rock_paper_scissors,
        3: tic_tac_toe,
        4: hangman
    }
    
    while True:
        clear_screen()
        display_menu()
        
        try:
            choice = int(input("Enter your choice (1-5): "))
            
            if choice == 5:
                print("\nThanks for playing! Goodbye!")
                sys.exit(0)
            elif choice in games:
                games[choice]()
            else:
                print("\nInvalid choice. Please select a number between 1 and 5.")
                input("Press Enter to continue...")
                
        except ValueError:
            print("\nInvalid input. Please enter a number.")
            input("Press Enter to continue...")


if __name__ == "__main__":
    main()