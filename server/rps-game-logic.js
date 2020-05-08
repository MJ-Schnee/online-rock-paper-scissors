class RockPaperScissorsGame {

    constructor(player1, player2) {
        this._players = [player1, player2];
        this._moves = [null, null];

        // Let both players know a new game has started
        this._messagePlayers("Rock. Paper. Scissors. Shoot!");

        // Add the event listener for each player to be able to make moves
        this._players.forEach( (player, index) => {
            player.on("move", (move) => {
                this._onPlayerMove(index, move);
            });
        });
    }

    // Sends a message to one player
    _messagePlayer(playerIndex, message) {
        this._players[playerIndex].emit("message", message);
    }

    // Sends a message to both players
    _messagePlayers(message) {
        this._players.forEach( (player) => {
            player.emit("message", message);
        });
    }

    // When the player makes a move, give them a response and update their selected move
    _onPlayerMove(playerIndex, move) {
        this._moves[playerIndex] = move;
        this._messagePlayer(playerIndex, `You have selected: ${move}`);

        this._checkGameOver();
    }

    _checkGameOver() {
        const moves = this._moves;

        // If both players have made a move, print the results and reset the moves
        if (moves[0] && moves[1]) {
            this._messagePlayers(`Results: ${moves[0]} - ${moves[1]}`);
            this._moves = [null, null];
            this._messagePlayers("Begin the next round!");
        }
    }
}

module.exports = RockPaperScissorsGame;