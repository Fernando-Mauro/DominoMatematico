import { onGameCreated } from "./DOM/onGameCreated.js";
import { ownerConstruction } from "./DOM/hostConstruccion.js";
import { emitCreateGame } from "./eventsHandler/emitCreateGame.js";
import { emitJoin } from "./eventsHandler/emitJoin.js";
import { onSendedPieces } from "./DOM/onSendedPieces.js";
import { getGameMode, getLastClicked, getSocket } from "./sharedModule.js";
import { buildQueue } from "./DOM/buildQueue.js";
import { changeCurrentTurn } from "./logic/changeCurrentTurn.js";
import { toggleCustomModal } from "./logic/toggleCustomModal.js";
import { onClickDesitionBtn } from "./eventsHandler/onClickDesitionBtn.js";
import { onWinner } from "./eventsHandler/onWinner.js";
import { showOnlineGames } from "./DOM/showOnlineGames.js";
import { createComputerPlayer } from "./logic/createComputerPlayer.js";

const socket = getSocket();

// Create a new game
const newGameBtn = document.querySelector("#btn-new-game");

newGameBtn.addEventListener("click", () => {
    emitCreateGame({ socket , input: "#input-name"});
});

socket.on("gameCreated", (gameId) => {
    onGameCreated({ gameId });
    ownerConstruction();
});

const joinGameBtn = document.querySelector("#joinToGame");
joinGameBtn.addEventListener("click", emitJoin);

socket.on("onJoinedGame", onGameCreated);

socket.on("sendedPieces", onSendedPieces);

socket.on("sendQueue", buildQueue);

socket.on("changeCurrentTurn", changeCurrentTurn);

socket.on("onWinner", onWinner);

const customModal = document.querySelector("#toggle-custom-modal-btn");
customModal.addEventListener("click", toggleCustomModal);

const pushHead = document.querySelector("#push-head");
pushHead.addEventListener("click", () => {
    onClickDesitionBtn({ side: "head" });
});

const pushTail = document.querySelector("#push-tail");
pushTail.addEventListener("click", () => {
    onClickDesitionBtn({ side: "tail" });
});

const inlineGames = document.querySelector("#see-inline-games");

inlineGames.addEventListener("click", () => {
    socket.emit("getOnlineGames", {
        gameMode : getGameMode()
    });
});

socket.on("emitOnlineGames", showOnlineGames);

const computerCreateGame = document.querySelector("#computer-create-game-btn");

computerCreateGame.addEventListener("click", () => {
    emitCreateGame({ socket , input: "#input-computer-name"});
    createComputerPlayer();
})