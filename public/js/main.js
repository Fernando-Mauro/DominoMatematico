import { onGameCreated } from "./DOM/onGameCreated.js";
import { ownerConstruction } from "./DOM/hostConstruccion.js";
import { emitCreateGame } from "./eventsHandler/emitCreateGame.js";
import { emitJoin } from "./eventsHandler/emitJoin.js";
import { onSendedPieces } from "./DOM/onSendedPieces.js";
import { getLastClicked, getSocket } from "./sharedModule.js";
import { buildQueue } from "./DOM/buildQueue.js";
import { changeCurrentTurn } from "./logic/changeCurrentTurn.js";
import { toggleCustomModal } from "./logic/toggleCustomModal.js";
import { onClickPiece } from "./eventsHandler/onClickPiece.js";
import { onEmitPiece } from "./eventsHandler/onEmitPiece.js";

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

socket.on("sendQueue", (data) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    buildQueue(data)
});

socket.on("changeCurrentTurn", changeCurrentTurn);

const customModal = document.querySelector("#toggle-custom-modal-btn");
customModal.addEventListener("click", toggleCustomModal);

const pushHead = document.querySelector("#push-head");
pushHead.addEventListener("click", () => {
    const { first, second } = getLastClicked();
    onEmitPiece({
        side: "head",
        first,
        second
    })
});

const pushTail = document.querySelector("#push-tail");
pushTail.addEventListener("click", () => {
    const { first, second } = getLastClicked();
    onEmitPiece({
        side: "tail",
        first,
        second
    })
});