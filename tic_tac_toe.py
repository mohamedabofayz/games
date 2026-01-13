"""
Tic Tac Toe game implementation with smart AI.
"""

import os
import random


def clear_screen():
    """Clear the terminal screen."""
    os.system('cls' if os.name == 'nt' else 'clear')


def print_board(board):
    """Print the current board state."""
    clear_screen()
    print("\n")
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---|---|---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---|---|---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print("\n")


def check_winner(board):
    """Check if there's a winner or if the game is a draw."""
    # Check rows
    for i in range(0, 9, 3):
        if board[i] == board[i+1] == board[i+2] != ' ':
            return board[i]
    
    # Check columns
    for i in range(3):
        if board[i] == board[i+3] == board[i+6] != ' ':
            return board[i]
    
    # Check diagonals
    if board[0] == board[4] == board[8] != ' ':
        return board[0]
    if board[2] == board[4] == board[6] != ' ':
        return board[2]
    
    # Check for draw
    if ' ' not in board:
        return 'Draw'
    
    return None


def minimax(board, depth, is_maximizing, alpha=-float('inf'), beta=float('inf')):
    """Advanced AI algorithm for optimal moves"""
    winner = check_winner(board)
    if winner == 'O':  # Computer wins
        return 1
    elif winner == 'X':  # Player wins
        return -1
    elif winner == 'Draw':  # Tie
        return 0
    
    if is_maximizing:  # Computer's turn
        max_eval = -float('inf')
        for i in range(9):
            if board[i] == ' ':
                board[i] = 'O'
                eval_score = minimax(board, depth + 1, False, alpha, beta)
                board[i] = ' '
                max_eval = max(max_eval, eval_score)
                alpha = max(alpha, eval_score)
                if beta <= alpha:
                    break
        return max_eval
    else:  # Player's turn
        min_eval = float('inf')
        for i in range(9):
            if board[i] == ' ':
                board[i] = 'X'
                eval_score = minimax(board, depth + 1, True, alpha, beta)
                board[i] = ' '
                min_eval = min(min_eval, eval_score)
                beta = min(beta, eval_score)
                if beta <= alpha:
                    break
        return min_eval


def best_move(board):
    """Find the best move for the computer using minimax"""
    best_val = -float('inf')
    best_move_pos = -1
    
    for i in range(9):
        if board[i] == ' ':
            board[i] = 'O'
            move_val = minimax(board, 0, False)
            board[i] = ' '
            
            if move_val > best_val:
                best_val = move_val
                best_move_pos = i
    
    return best_move_pos


def tic_tac_toe():
    """Main function to play Tic Tac Toe."""
    print("\n--- TIC-TAC-TOE ---")
    print("You are X, Computer is O")
    print("Enter positions 1-9 as shown below:")
    
    # Show position numbers
    position_board = [str(i) for i in range(1, 10)]
    temp_board = position_board[:]
    print("\n")
    print(f" {temp_board[0]} | {temp_board[1]} | {temp_board[2]} ")
    print("---|---|---")
    print(f" {temp_board[3]} | {temp_board[4]} | {temp_board[5]} ")
    print("---|---|---")
    print(f" {temp_board[6]} | {temp_board[7]} | {temp_board[8]} ")
    print("\n")
    
    input("Press Enter to start...")
    
    # Initialize game
    board = [' '] * 9
    current_player = 'X'
    
    while True:
        print_board(board)
        
        if current_player == 'X':
            try:
                pos = int(input(f"Your turn, enter position (1-9): "))
                if pos < 1 or pos > 9:
                    print("Position must be between 1 and 9. Try again.")
                    input("Press Enter to continue...")
                    continue
                    
                index = pos - 1  # Convert to 0-based index
                
                if board[index] != ' ':
                    print("That position is already taken. Try again.")
                    input("Press Enter to continue...")
                    continue
                    
                board[index] = current_player
                
            except ValueError:
                print("Please enter a valid number.")
                input("Press Enter to continue...")
                continue
        else:
            print("Computer is thinking...")
            index = best_move(board)
            board[index] = current_player
            print(f"Computer chose position {index + 1}")
            input("Press Enter to continue...")
            
        result = check_winner(board)
        if result:
            print_board(board)
            if result == 'Draw':
                print("It's a draw!")
            elif result == 'X':
                print("Congratulations! You win!")
            else:
                print("Computer wins! Better luck next time!")
            break
            
        # Switch player
        current_player = 'O' if current_player == 'X' else 'X'
    
    input("\nPress Enter to return to the main menu...")


if __name__ == "__main__":
    tic_tac_toe()