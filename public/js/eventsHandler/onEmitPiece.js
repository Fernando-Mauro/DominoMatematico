import { checkWin } from "../logic/checkWin.js";
import { getMyTurn, getSocket , getLastClicked, setQueueGame} from "../sharedModule.js"

export const onEmitPiece = ({side, first, second}) => {
    const socket = getSocket();
    setQueueGame({first, second});
    socket.emit("onPushPiece", {
        side,
        first, 
        second,
        isTurn: getMyTurn()
    });
    const { container } = getLastClicked();
    container.remove();
    checkWin();
}