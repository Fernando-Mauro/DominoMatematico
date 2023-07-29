// Para crear ID unicos
const uuidv4 = require("uuid");
const { Game } = require("../classes/")
const { setGamesOnline } = require("../context/globalContext")

const onCreateNewGame = ({userName, modeGame, socket}) => {
    
    // Abandonar todas las salas
    if (socket.connectedRooms.length != 0) {
        socket.connectedRooms.forEach( room => socket.leave(room) );
    }

    const idGame = uuidv4.v4().split("-")[0];
    const game = new Game(socket, idGame, userName, modeGame);

    // Crear la sala
    socket.join(idGame);
    socket.actualGame = game;
    socket.connectedRooms.push(idGame);
    
    setGamesOnline(idGame);

    socket.emit("newGameCreated", {
        piezas: game.piezas,
        idGame: game.idGame
    });
};

module.exports = onCreateNewGame;