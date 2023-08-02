const getGame = require("../context/globalContext");

const onFinishGame = ({ socket }) => {
    const [, gameId] = [...socket.rooms];
    
    const game = getGame(gameId);

    game.countPoints();

}

module.exports = onFinishGame;