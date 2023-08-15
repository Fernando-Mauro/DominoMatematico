const {
    emitWinner,
    onCreateNewGame,
    onEatPiece,
    onEmitGloballyGames,
    onFinishGame,
    onJoiningGame,
    onPushPiece,
    onSkipTurn,
    onStartGame,
    sendOnlineGames
} = require("./sockets/index")

const handleSocketEvents = ({ socket, io }) => {
    socket.connectedRooms = [];

    socket.on("onCreateNewGame", (data) => {
        onCreateNewGame({ ...data, socket });
    });

    socket.on("onJoiningGame", (data) => {
        onJoiningGame({ ...data, socket });
    });

    socket.on("startGame", () => {
        onStartGame(socket);
    });

    socket.on("onPushPiece", (data) => {
        onPushPiece({ socket, data, io });
    });

    socket.on("skipTurn", () => onSkipTurn({ socket }));

    socket.on("eat-piece", () => {
        onEatPiece({ socket })
    });

    socket.on("endGame", () => {
        onFinishGame({ socket })
    })

    socket.on("winner", ({ winnerName }) => {
        emitWinner({ socket, winnerName })
    });

    socket.on("getOnlineGames", ({ gameMode }) => {
        sendOnlineGames({ socket, gameMode });
    });

    socket.on("globallyInlineGames", () => {
        onEmitGloballyGames({ socket })
    });
};

module.exports = handleSocketEvents;