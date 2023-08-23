import { getQueueGame } from "../sharedModule.js"
import { getComputerPieces, getComputerSocket } from "../computerSharedModule.js";
import { onEmitComputerPiece } from "../computerEventsHandler/onEmitComputerPiece.js";
import { deletePieceFromComputer } from "./deletePieceFromComputer.js";

export const choosePieceComputer = (loop=false) => {
    const queueGame = getQueueGame();
    const computerPieces = getComputerPieces();
    let choosedPiece = {};
    const computerSocket = getComputerSocket();
    let eatedPiece = false;
    if (queueGame[0] === undefined && queueGame[1] === undefined ) {
        for (let i = 6; i >= 0; --i) {
            computerPieces.find(piece => {
                if (piece.first === i && piece.second === i) {
                    choosedPiece = {
                        first: piece.first,
                        second: piece.second,
                        side : "middle"
                    }
                    i = -1;
                }
            });
        }
    } else {
        let bandera = true;
        queueGame.forEach((side, index) => {
            computerPieces.forEach(piece => {
                if(bandera && piece.first === side || piece.second === side){
                    choosedPiece = {
                        first: piece.first,
                        second: piece.second,
                        side : index === 0 ? "head" : "tail"
                    }
                    bandera = false;
                }
            })
        })
        if(bandera && !loop){
            console.log("comer pieza");
            computerSocket.emit("eat-piece");
            eatedPiece = true;
        }
    }

    if (choosedPiece.first !== undefined && choosedPiece.second !== undefined) {
        deletePieceFromComputer(choosedPiece);

        console.log(choosedPiece);
        onEmitComputerPiece({
            side: choosedPiece.side,
            first: choosedPiece.first,
            second: choosedPiece.second
        });
    }else{
        if(!eatedPiece){
            console.log('salte turno');
            computerSocket.emit("skipTurn");
        }
    }
}