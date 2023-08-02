
const getGameId = ({ socket }) => {
    const [,gameId] = [...socket.rooms];
    return gameId;
}

module.exports = { getGameId };