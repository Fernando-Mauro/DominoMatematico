const gamesOnline = new Map();

const getGamesOnline = () => {
    return gamesOnline;
}

const setGamesOnline = (idGame, game ) => {
    return gamesOnline.set(idGame, game);
}

module.exports = {
    getGamesOnline,
    setGamesOnline
}