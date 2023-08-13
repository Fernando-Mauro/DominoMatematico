import { toggleCustomModal } from "../logic/toggleCustomModal.js";
import { getQueueGame, setLastClicked, getMyTurn } from "../sharedModule.js";

export const onClickPiece = ({pointsBottom, pointsTop, containerPiece}) => {
    const queueGame = getQueueGame();
    const isMyTurn = getMyTurn();

    if (isMyTurn) {
        if (queueGame.length != 0) {
            setLastClicked({pointsTop, pointsBottom, containerPiece});
            toggleCustomModal();
        } else {
            lastFirst = piece.first;
            lastSecond = piece.second;
            lastContainPiece = containPiece;
            comprobatePiece(piece.first, piece.second, "middle");
        }
    }
}