const socket = io();

import { gameCreated } from "./DOM/gameCreated.js";
import { ownerConstruction } from "./DOM/hostConstruccion.js";
import { emitCreateGame } from "./eventsHandler/emitCreateGame.js";
import { emitJoin } from "./eventsHandler/emitJoin.js";


// Create a new game
const newGameBtn = document.querySelector("#btn-new-game");

newGameBtn.addEventListener("click", () => {
    emitCreateGame({ socket });
});

socket.on("gameCreated", (gameId) => {
    gameCreated({ gameId });
    ownerConstruction({socket});
});

const joinGameBtn = document.querySelector("#joinToGame");
joinGameBtn.addEventListener("click", () => emitJoin({ socket }));
