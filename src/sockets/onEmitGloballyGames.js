const { getGamesOnline } = require("../context/globalContext");

const onEmitGloballyGames = ({ socket }) => {
    let llaves = [];
    const games = getGamesOnline();

    games.forEach(gameActive => {
        if (gameActive.players.length < 4 && gameActive.startedGame === false) {
            llaves.push({
                gameId: gameActive.gameId,
                numberPlayers: gameActive.players.length,
                ownerName: gameActive.owner.name,
                type: gameActive.gameMode
            });
        }
    });
    socket.emit("inLineGamesGlobally", llaves);
}

module.exports = onEmitGloballyGames;