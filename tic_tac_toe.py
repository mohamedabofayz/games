"""
Tic Tac Toe game implementation.
"""


def print_board(board):
    """Print the current board state."""
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


def tic_tac_toe():
    """Main function to play Tic Tac Toe."""
    print("\n--- TIC-TAC-TOE ---")
    print("Player 1: X, Player 2: O")
    print("Enter positions 1-9 as shown below:")
    
    # Show position numbers
    position_board = [str(i) for i in range(1, 10)]
    print_board(position_board)
    
    # Initialize game
    board = [' '] * 9
    current_player = 'X'
    
    while True:
        print_board(board)
        
        try:
            pos = int(input(f"Player {current_player}, enter position (1-9): "))
            if pos < 1 or pos > 9:
                print("Position must be between 1 and 9. Try again.")
                continue
                
            index = pos - 1  # Convert to 0-based index
            
            if board[index] != ' ':
                print("That position is already taken. Try again.")
                continue
                
            board[index] = current_player
            
            result = check_winner(board)
            if result:
                print_board(board)
                if result == 'Draw':
                    print("It's a draw!")
                else:
                    print(f"Player {result} wins!")
                break
                
            # Switch player
            current_player = 'O' if current_player == 'X' else 'X'
            
        except ValueError:
            print("Please enter a valid number.")
    
    input("\nPress Enter to return to the main menu...")


if __name__ == "__main__":
    tic_tac_toe()