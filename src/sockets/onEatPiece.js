const { getGame } = require("../context/globalContext");

const onEatPiece = ({ socket }) => {

    const [, gameId] = [...socket.rooms];
    const game = getGame({ gameId });

    if (game.players.length < 4) {
        const piece = game.eatPieces();
        socket.emit("eatedPiece", piece);
    }

}

module.exports = onEatPiece;