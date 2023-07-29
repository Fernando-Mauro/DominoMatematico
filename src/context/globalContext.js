const gamesOnline = new Map();

const getGamesOnline = () => {
    return gamesOnline;
}

const setGamesOnline = (gameId, game ) => {
    return gamesOnline.set(gameId, game);
}

const hasGameOnline = ({socket, gameId, gameMode}) => {
    return gamesOnline.has(gameId) && socket.rooms.size == 1 && gamesOnline.get(gameId).players.length < 4 && gamesOnline.get(gameId).gameMode === gameMode && gamesOnline.get(gameId).startedGame === false
}

const setPlayerInGame = ( gameId, player ) => {
    gamesOnline.get(gameId).players.push(player);
}

module.exports = {
    getGamesOnline,
    setGamesOnline,
    hasGameOnline,
    setPlayerInGame
}