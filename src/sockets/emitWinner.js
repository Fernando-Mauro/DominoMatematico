const { getGame } = require("../context/globalContext");
const { getGameId } = require("../getGameId");

const emitWinner = ({socket, winnerName}) => {
    const gameId = getGameId({ socket });
    const game = getGame({gameId});

    game.players.forEach(player => {
        player.socketPlayer.emit("onWinner", {
            name: winnerName
        });
    });
}

module.exports = emitWinner;