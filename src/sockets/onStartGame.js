const onStartGame = (socket) => {
    
    if (socket.actualGame.players.length < 2) {
        socket.emit("lessThanTwoPlayers", {
            message: "No se puede iniciar el juego con 1 jugador"
        })
        return;
    }
    // Comenzar el juego (repartir piezas y asignar turno)
    socket.actualGame.startGame();

    // Comprobar que el juego no se intente iniciar dos veces
    if (socket.actualGame.startedGame) return;

    // Emitir los eventos de enviar piezas a cada jugador
    socket.actualGame.players.forEach((player, index) => {
        const { name } = socket.actualGame.players[socket.actualGame.turn];
        player.socketPlayer.emit("sendedPieces", {
            pieces: player.hand,
            gameMode: socket.actualGame.gameMode,
            currentTurn: name
        });
    });

    socket.actualGame.startedGame = true;
}
module.exports = onStartGame;