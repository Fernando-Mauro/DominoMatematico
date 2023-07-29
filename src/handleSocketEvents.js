const { onCreateNewGame, onJoiningGame, onStartGame } = require("./sockets/index")

const handleSocketEvents = (socket) => {
    socket.connectedRooms = [];

    // Create a new game
    socket.on("onCreateNewGame", (data) => {

        onCreateNewGame({ ...data, socket });

    });

    // Join to room
    socket.on("onJoiningGame", (data) => {

        onJoiningGame({ ...data, socket });

    });

    // Start the game
    socket.on("startGame", () => {
        onStartGame(socket);
    });


    // Pushing a piece
    socket.on("pushPiece", (piece) => {
        // Socket.rooms contiene las salas a las cuales esta conectada el socket
        // pero la posicion [0] es el id del socket y a partir de la segunda es una sala

        const [, idRoom] = [...socket.rooms];
        const last = gamesInline.get(idRoom).pushingPiece(piece);

        io.in(idRoom).emit("sendQueue", {
            queueGame: gamesInline.get(idRoom).queueGame,
            lastInformation: last
        });
    });


    socket.on("skipTurn", () => {

        const [, idRoom] = [...socket.rooms];
        gamesInline.get(idRoom).nextTurn();

    });

    socket.on("eat-piece", () => {
        const [, idRoom] = [...socket.rooms];
        if (gamesInline.get(idRoom).players.length < 4) {

            const piece = gamesInline.get(idRoom).eatPieces();
            socket.emit("eatedPiece", piece);

        }
    });

    socket.on("endGame", () => {
        const [, idRoom] = [...socket.rooms];
        gamesInline.get(idRoom).countPoints();
    })

    socket.on("winner", (data) => {
        const [, idRoom] = [...socket.rooms];
        gamesInline.get(idRoom).players.forEach(player => {
            player.socketPlayer.emit("winner", data);
        });
    });

    socket.on("inLineGames", ({ modeGame }) => {
        let llaves = [];
        gamesInline.forEach(gameActive => {
            if (gameActive.modeGame === modeGame && gameActive.players.length < 4 && gameActive.startedGame === false) {
                llaves.push({
                    gameId: gameActive.idRoom,
                    numberPlayers: gameActive.players.length,
                    ownerName: gameActive.owner.name
                });
            }
        });
        socket.emit("inLineGames", llaves);

    });
    socket.on("globallyInlineGames", () => {
        let llaves = [];
        gamesInline.forEach(gameActive => {
            if (gameActive.players.length < 4 && gameActive.startedGame === false) {
                llaves.push({
                    gameId: gameActive.idRoom,
                    numberPlayers: gameActive.players.length,
                    ownerName: gameActive.owner.name,
                    type: gameActive.modeGame
                });
            }
        });
        socket.emit("inLineGamesGlobally", llaves);

    });
};

module.exports = handleSocketEvents;