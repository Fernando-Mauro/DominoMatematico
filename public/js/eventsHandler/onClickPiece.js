import { toggleCustomModal } from "../logic/toggleCustomModal.js";
import { getQueueGame, setLastClicked, getMyTurn } from "../sharedModule.js";
import { onEmitPiece } from "./onEmitPiece.js";

export const onClickPiece = ({pointsBottom, pointsTop, containerPiece}) => {
    const queueGame = getQueueGame();
    const isMyTurn = getMyTurn();

    if (isMyTurn) {
        if (queueGame.length != 0) {
            setLastClicked({pointsTop, pointsBottom, containerPiece});
            toggleCustomModal();
        } else {
            setLastClicked({pointsTop, pointsBottom, containerPiece});
            onEmitPiece({first: pointsTop,second: pointsBottom, side: "middle"});
        }
    }
}