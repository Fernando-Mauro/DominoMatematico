const { getGame } = require("../context/globalContext")

const onSkipTurn = ({ socket }) => {
    const [, gameId] = [...socket.rooms];
    
    const game = getGame({ gameId });
    game.nextTurn();
}

module.exports = onSkipTurn;