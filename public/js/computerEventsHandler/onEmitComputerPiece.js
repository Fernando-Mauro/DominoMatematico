import { getComputerSocket } from "../computerSharedModule.js";
import { checkComputerWin } from "../logic/checkComputerWin.js";

export const onEmitComputerPiece = ({side, first, second}) => {
    const computerSocket = getComputerSocket();

    computerSocket.emit("onPushPiece", {
        side,
        first, 
        second,
        isTurn: true
    });

    checkComputerWin();
}