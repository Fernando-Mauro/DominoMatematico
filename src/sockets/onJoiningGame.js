const { hasGameOnline , setPlayerInGame} = require("../context/globalContext");
const { Player } = require("../classes/");

const onJoiningGame = ({ socket, gameId, userName, gameMode }) => {
    
    // Comprobar que la sala exista, que solo esta conectado a una sala, y que la sala aun no este llena
    if (hasGameOnline({socket ,gameId, gameMode})) {
        const memberRoom = new Player(socket, userName);

        socket.join(gameId);
        
        setPlayerInGame(gameId, memberRoom);

        socket.emit("onJoinedGame", {
            gameId: gameId
        });

    } else {
        socket.emit("error", {
            message: "No existe la sala o ya te encuentras en otra sala",
            id: gameId
        });
    }
}

module.exports = onJoiningGame;