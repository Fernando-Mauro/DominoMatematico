const { getGamesOnline } = require("../context/globalContext");

const sendOnlineGames = ({ socket, gameMode }) => {

    let llaves = [];
    const games = getGamesOnline();
    games.forEach(gameActive => {
        if (gameActive.gameMode === gameMode && gameActive.players.length < 4 && gameActive.startedGame === false) {
            llaves.push({
                gameId: gameActive.gameId,
                numberPlayers: gameActive.players.length,
                ownerName: gameActive.owner.name
            });
            
        }
    });
    socket.emit("emitOnlineGames", llaves);
}

module.exports = sendOnlineGames;