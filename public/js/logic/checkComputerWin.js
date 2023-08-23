import { getComputerPieces } from "../computerSharedModule.js";
import { getSocket } from "../sharedModule.js";

const socket = getSocket();

export const checkComputerWin = () => {
    const piecesComputer = getComputerPieces();

    if(piecesComputer.length === 0){
        socket.emit("winner", {
            winnerName: "computer"
        });
    }
}