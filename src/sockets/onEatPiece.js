const { getGame } = require("../context/globalContext");
const { getGameId } = require("../getGameId.js");

const onEatPiece = ({ socket }) => {
    const gameId = getGameId({ socket });

    const game = getGame({ gameId });

    if (game.players.length < 4) {
        const piece = game.eatPieces();
        console.log("emitiendo piezas: ", piece);
        socket.emit("eated-piece", piece);
    }

}

module.exports = onEatPiece;