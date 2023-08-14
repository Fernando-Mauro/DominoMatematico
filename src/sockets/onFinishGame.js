const getGame = require("../context/globalContext");
const { getGameId } = require("../getGameId");

const onFinishGame = ({ socket }) => {
    const gameId = getGameId({ socket });
    const game = getGame(gameId);

    game.countPoints();

}

module.exports = onFinishGame;