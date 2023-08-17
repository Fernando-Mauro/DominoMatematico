import { onSendedPieces } from "../computerEventsHandler/onSendedPieces.js";
import { getComputerSocket } from "../computerSharedModule.js"

export const setComputerEvents = () => {
    const computerSocket = getComputerSocket();

    computerSocket.on("sendedPieces", onSendedPieces)
    computerSocket.on("changeCurrentTurn", () => {
        
    });
}