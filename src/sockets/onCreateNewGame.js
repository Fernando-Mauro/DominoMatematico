// Para crear ID unicos
const uuidv4 = require("uuid");
const { Game } = require("../classes/")
const { setGamesOnline } = require("../context/globalContext")

const onCreateNewGame = ({ userName, gameMode, socket }) => {

    // Abandonar todas las salas
    if (socket.connectedRooms.length != 0) {
        socket.connectedRooms.forEach(room => socket.leave(room));
    }

    const gameId = uuidv4.v4().split("-")[0];
    const game = new Game({ socket, gameId, userName, gameMode });

    // Crear la sala
    socket.join(gameId);
    socket.actualGame = game;
    socket.connectedRooms.push(gameId);

    setGamesOnline(gameId, game);

    socket.emit("newGameCreated", {
        pieces: game.pieces,
        gameId: game.gameId
    });
};

module.exports = onCreateNewGame;