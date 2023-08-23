const { getGame } = require("../context/globalContext")

const onSkipTurn = ({ socket }) => {
    const [, gameId] = [...socket.rooms];
    
    const game = getGame({ gameId });
    console.log("saltando turno");
    game.nextTurn();
}

module.exports = onSkipTurn;