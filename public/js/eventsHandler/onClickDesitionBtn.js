import { isValidPiece } from "../logic/isValidPiece.js";
import { toggleCustomModal } from "../logic/toggleCustomModal.js";
import { updatePoints } from "../logic/updatePoints.js";
import { getLastClicked, getSocket } from "../sharedModule.js";
import { onEmitPiece } from "./onEmitPiece.js";
const socket = getSocket();
const fail = document.getElementById("fail");

export const onClickDesitionBtn = ({ side }) => {
    const { first, second } = getLastClicked();
    if (isValidPiece({ first, second, side})) {
        onEmitPiece({
            side,
            first,
            second
        });
        updatePoints({first, second})
    } else {
        fail.play();
        socket.emit("skipTurn");
    }
    toggleCustomModal();
}