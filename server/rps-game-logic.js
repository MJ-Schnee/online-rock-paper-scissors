class RockPaperScissorsGame {

    constructor(player1, player2) {
        this._players = [player1, player2];
        this._moves = [null, null];

        // Let both players know a new game has started
        this._messagePlayers("Rock. Paper. Scissors. Shoot!");
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

    _onPlayerMove(playerIndex, move) {
        this._moves[playerIndex] = move;
        this._messagePlayer(playerIndex, `You have selected: ${move}`);
    }
}

module.exports = RockPaperScissorsGame;