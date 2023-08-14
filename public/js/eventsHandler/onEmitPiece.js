import { getMyTurn, getSocket } from "../sharedModule.js"

export const onEmitPiece = ({side, first, second}) => {
    const socket = getSocket();

    socket.emit("onPushPiece", {
        side,
        first, 
        second,
        isTurn: getMyTurn()
    });
}