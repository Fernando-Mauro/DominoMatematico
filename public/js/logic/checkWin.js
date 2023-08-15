import { getSocket, getUserName } from "../sharedModule.js";

const socket = getSocket();

export const checkWin = () => {
    const piecesContainer = document.querySelector("#pieces-container");

    if (piecesContainer.childElementCount === 0) {
        const modal = document.querySelector("#wined-game");
        const smmodal = new Modal(modal);
        smmodal.show();
        socket.emit("winner", {
            winnerName: getUserName()
        });
    }

}