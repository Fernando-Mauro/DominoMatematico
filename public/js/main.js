import { onGameCreated } from "./DOM/onGameCreated.js";
import { ownerConstruction } from "./DOM/hostConstruccion.js";
import { emitCreateGame } from "./eventsHandler/emitCreateGame.js";
import { emitJoin } from "./eventsHandler/emitJoin.js";
import { onSendedPieces } from "./DOM/onSendedPieces.js";
import { getSocket } from "./sharedModule.js";

const socket = getSocket();

// Create a new game
const newGameBtn = document.querySelector("#btn-new-game");

newGameBtn.addEventListener("click", () => {
    emitCreateGame({ socket });
});

socket.on("gameCreated", (gameId) => {
    onGameCreated({ gameId });
    ownerConstruction();
});

const joinGameBtn = document.querySelector("#joinToGame");
joinGameBtn.addEventListener("click", emitJoin);

socket.on("onJoinedGame", onGameCreated);

socket.on("sendedPieces", onSendedPieces);