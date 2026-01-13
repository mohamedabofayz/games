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
    """Smart number guessing game with adaptive difficulty."""
    import random
    import os
    
    def clear_screen():
        """Clear the terminal screen."""
        os.system('cls' if os.name == 'nt' else 'clear')
    
    clear_screen()
    print("\n--- NUMBER GUESSING GAME ---")
    
    # Difficulty selection
    print("Choose difficulty:")
    print("1. Easy (1-50, unlimited attempts)")
    print("2. Medium (1-100, limited attempts)")
    print("3. Hard (1-200, limited attempts)")
    
    while True:
        try:
            choice = int(input("Enter choice (1-3): "))
            if choice == 1:
                secret_number = random.randint(1, 50)
                max_num = 50
                attempts_limit = float('inf')
                break
            elif choice == 2:
                secret_number = random.randint(1, 100)
                max_num = 100
                attempts_limit = 10
                break
            elif choice == 3:
                secret_number = random.randint(1, 200)
                max_num = 200
                attempts_limit = 8
                break
            else:
                print("Please enter 1, 2, or 3.")
        except ValueError:
            print("Please enter a valid number.")
    
    print(f"\nI'm thinking of a number between 1 and {max_num}.")
    if attempts_limit != float('inf'):
        print(f"You have {attempts_limit} attempts to guess it.")
    else:
        print("You have unlimited attempts.")
    
    attempts = 0
    previous_guesses = []
    
    while attempts < attempts_limit:
        try:
            guess = int(input(f"Attempt {attempts + 1}: Enter your guess: "))
            if guess < 1 or guess > max_num:
                print(f"Please enter a number between 1 and {max_num}.")
                continue
                
            attempts += 1
            previous_guesses.append(guess)
            
            if guess == secret_number:
                print(f"🎉 Congratulations! You guessed the number in {attempts} attempts!")
                
                # Calculate score based on attempts
                if attempts == 1:
                    print("Perfect! You're a mind reader! 😲")
                elif attempts <= 3:
                    print("Amazing! That was very quick! 🌟")
                elif attempts <= 5:
                    print("Great job! You're very good at this! 👍")
                elif attempts <= 8:
                    print("Nice work! You got there! 👌")
                else:
                    print("Well done for persevering! 🙌")
                
                break
            elif guess < secret_number:
                diff = secret_number - guess
                if diff <= 5:
                    print("Very close! Just a little higher! 🔥")
                elif diff <= 15:
                    print("Close! Try higher! 📈")
                else:
                    print("Too low! Try a higher number. 📉")
            else:
                diff = guess - secret_number
                if diff <= 5:
                    print("Very close! Just a little lower! 🔥")
                elif diff <= 15:
                    print("Close! Try lower! 📉")
                else:
                    print("Too high! Try a lower number. 📈")
            
            # Provide hints based on previous guesses
            if len(previous_guesses) > 1:
                if previous_guesses[-1] > previous_guesses[-2] and guess > secret_number and previous_guesses[-2] > secret_number:
                    print("You're getting further from the target! 🎯")
                elif previous_guesses[-1] < previous_guesses[-2] and guess < secret_number and previous_guesses[-2] < secret_number:
                    print("You're getting further from the target! 🎯")
            
        except ValueError:
            print("Please enter a valid number.")
    
    if attempts >= attempts_limit and attempts_limit != float('inf'):
        print(f"\n💀 Game over! The number was {secret_number}. Better luck next time!")
    
    input("\nPress Enter to return to the main menu...")


def rock_paper_scissors():
    """Smart rock paper scissors game with adaptive AI."""
    import random
    import os
    
    def clear_screen():
        """Clear the terminal screen."""
        os.system('cls' if os.name == 'nt' else 'clear')
    
    clear_screen()
    print("\n--- ROCK PAPER SCISSORS ---")
    print("Choose: (R)ock, (P)aper, (S)cissors, or (Q)uit")
    
    choices = {'r': 'rock', 'p': 'paper', 's': 'scissors'}
    choice_beats = {'r': 's', 'p': 'r', 's': 'p'}  # What each choice beats
    player_score = 0
    computer_score = 0
    rounds_played = 0
    
    # Track player's previous choices for pattern analysis
    player_history = []
    
    while True:
        print(f"\nScore - You: {player_score}, Computer: {computer_score}, Rounds: {rounds_played}")
        player_choice = input("Enter your choice (R/P/S/Q): ").lower()
        
        if player_choice == 'q':
            break
        
        if player_choice not in choices:
            print("Invalid choice. Please enter R, P, S, or Q.")
            continue
        
        # Add player choice to history
        player_history.append(player_choice)
        rounds_played += 1
        
        # Smart AI: try to predict player's next move based on patterns
        if len(player_history) >= 2:
            # Simple pattern recognition: if player repeated a move, they might go again
            # or if they follow a pattern, predict next move
            last_move = player_history[-1]
            second_last = player_history[-2]
            
            if last_move == second_last:
                # If player repeated, predict they'll continue the pattern
                predicted_player_move = last_move
            elif len(player_history) >= 3:
                # Look for simple patterns in last 3 moves
                third_last = player_history[-3]
                if third_last == second_last and second_last != last_move:
                    # If pattern is AAB, predict A again
                    predicted_player_move = third_last
                else:
                    # Use frequency analysis of last 5 moves
                    recent_moves = player_history[-5:]
                    predicted_player_move = max(set(recent_moves), key=recent_moves.count)
            else:
                # If not enough data, make random choice
                predicted_player_move = random.choice(list(choices.keys()))
            
            # Computer chooses to beat the predicted player move
            computer_choice = choice_beats[predicted_player_move]
        else:
            # For first moves, make random choice
            computer_choice = random.choice(list(choices.keys()))
        
        print(f"You chose: {choices[player_choice]}")
        print(f"Computer chose: {choices[computer_choice]}")
        
        # Determine winner
        if player_choice == computer_choice:
            print("It's a tie!")
        elif choice_beats[player_choice] == computer_choice:
            print("You win this round!")
            player_score += 1
        else:
            print("Computer wins this round!")
            computer_score += 1
        
        # Show round result
        if player_choice != computer_choice:
            if choice_beats[player_choice] == computer_choice:
                print("🏆 You won this round!")
            else:
                print("💻 Computer won this round!")
    
    print(f"\n📊 FINAL RESULTS")
    print(f"You: {player_score} | Computer: {computer_score} | Rounds: {rounds_played}")
    
    # Calculate win percentage
    if rounds_played > 0:
        win_percentage = (player_score / rounds_played) * 100
        print(f"Your win rate: {win_percentage:.1f}%")
        
        if win_percentage > 60:
            print("🎉 Excellent! You dominated the game!")
        elif win_percentage > 50:
            print("👍 Good job! You played well!")
        elif win_percentage == 50:
            print("🤝 Even match! You're evenly matched!")
        elif win_percentage > 40:
            print("😊 Not bad! Keep practicing!")
        else:
            print("💪 Keep trying! Practice makes perfect!")
    
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