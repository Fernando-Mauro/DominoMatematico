// Para crear ID unicos
const uuidv4 = require("uuid");
const { Game } = require("../classes/")

const onNewGame = ({userName, modeGame, socket}) => {
    if (socket.connectedRooms.length != 0) {
        socket.connectedRooms.forEach(room => socket.leave(room));
    }

    const idRoom = uuidv4.v4().split("-")[0];
    const newGame = new Game(socket, idRoom, userName, modeGame);

    // Crear la sala
    socket.join(idRoom);
    socket.actualGame = newGame;
    socket.connectedRooms.push(idRoom);
    gamesInline.set(idRoom, newGame);


    socket.emit("newGameCreate", {
        piezas: newGame.piezas,
        idRoom: newGame.idRoom
    });
};

module.exports = onNewGame;