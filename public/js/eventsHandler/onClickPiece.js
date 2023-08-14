import { toggleCustomModal } from "../logic/toggleCustomModal.js";
import { getQueueGame, setLastClicked, getMyTurn } from "../sharedModule.js";
import { onEmitPiece } from "./onEmitPiece.js";

export const onClickPiece = ({ second, first, containerPiece }) => {
    const queueGame = getQueueGame();
    const isMyTurn = getMyTurn();

    if (isMyTurn) {
        if (queueGame.length != 0) {
            setLastClicked({
                first: first,
                second: second,
                containerPiece
            });
            toggleCustomModal();
        } else {
            setLastClicked({ first, second, containerPiece });
            onEmitPiece({
                first: first,
                second: second,
                side: "middle"
            });
        }
    }
}