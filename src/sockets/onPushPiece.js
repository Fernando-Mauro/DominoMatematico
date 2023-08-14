const { getGame } = require("../context/globalContext")

const onPushPiece = ({io,socket, data}) => {
    // Socket.rooms contiene las salas a las cuales esta conectada el socket
    // pero la posicion [0] es el id del socket y a partir de la segunda es una sala
    const [, gameId] = [...socket.rooms];
    
    const game = getGame({gameId});

    const last = game.pushingPiece(data);
    io.in(gameId).emit("sendQueue", {
        last
    });
}

module.exports = onPushPiece;