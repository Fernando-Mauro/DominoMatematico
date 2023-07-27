const { onNewGame } = require("./sockets/index")

const handleSocketEvents = (socket) => {
    socket.connectedRooms = [];

    // Create a new game
    socket.on("newGame", ({userName, modeGame}) => onNewGame({userName, modeGame, socket}));

    // Join to room
    socket.on("joinGame", ({ idRoom, userName, modeGame }) => {

        // Comprobar que la sala exista, que solo esta conectado a una sala, y que la sala aun no este llena
        if (gamesInline.has(idRoom) && socket.rooms.size == 1 && gamesInline.get(idRoom).players.length < 4 && gamesInline.get(idRoom).modeGame === modeGame && gamesInline.get(idRoom).startedGame === false) {

            const memberRoom = new Player(socket, userName);
            gamesInline.get(idRoom).players.push(memberRoom);

            socket.join(idRoom);

            socket.emit("connectedRoom", {
                idRoom: idRoom
            });

        } else {
            socket.emit("error", {
                message: "No existe la sala o ya te encuentras en otra sala",
                id: idRoom
            });
        }
    });

    // Start the game
    socket.on("startGame", () => {
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
            player.socketPlayer.emit("sendPieces", {
                pieces: player.hand
            });
            if (socket.actualGame.turn === index) {
                player.socketPlayer.emit("turn", {
                    name: player.name
                })
            } else {
                const { name } = socket.actualGame.players[socket.actualGame.turn];
                player.socketPlayer.emit("notTurn", {
                    name: name
                })
            }
        });

        socket.actualGame.startedGame = true;
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
                    idGame: gameActive.idRoom,
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
                    idGame: gameActive.idRoom,
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