const { getGame } = require("../context/globalContext")

const onPushPiece = ({io,socket, piece}) => {
    // Socket.rooms contiene las salas a las cuales esta conectada el socket
    // pero la posicion [0] es el id del socket y a partir de la segunda es una sala
    const [, gameId] = [...socket.rooms];
    
    const game = getGame({gameId});

    const last = game.pushingPiece(piece);
    io.in(gameId).emit("sendQueue", {
        queueGame: game.queueGame,
        lastInformation: last
    });
}

module.exports = onPushPiece;