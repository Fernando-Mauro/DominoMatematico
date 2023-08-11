const socket = io();

import { onGameCreated } from "./DOM/onGameCreated.js";
import { ownerConstruction } from "./DOM/hostConstruccion.js";
import { emitCreateGame } from "./eventsHandler/emitCreateGame.js";
import { emitJoin } from "./eventsHandler/emitJoin.js";


// Create a new game
const newGameBtn = document.querySelector("#btn-new-game");

newGameBtn.addEventListener("click", () => {
    emitCreateGame({ socket });
});

socket.on("gameCreated", (gameId) => {
    onGameCreated({ gameId });
    ownerConstruction({socket});
});

const joinGameBtn = document.querySelector("#joinToGame");
joinGameBtn.addEventListener("click", () => emitJoin({ socket }));

socket.on("onJoinedGame", onGameCreated);