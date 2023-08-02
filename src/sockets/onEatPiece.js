const { getGame } = require("../context/globalContext");
const { getGameId } = require("../getGameId.js");

const onEatPiece = ({ socket }) => {
    const gameId = getGameId({ socket });

    const game = getGame({ gameId });

    if (game.players.length < 4) {
        const piece = game.eatPieces();
        socket.emit("eatedPiece", piece);
    }

}

module.exports = onEatPiece;