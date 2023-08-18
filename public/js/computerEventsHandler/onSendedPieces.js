import { setComputerPieces } from "../computerSharedModule.js"
import { choosePieceComputer } from "../logic/choosePieceComputer.js";

export const onSendedPieces = ({
    pieces,
    gameMode,
    currentTurn
}) => { 
    setComputerPieces(pieces); 

    if(currentTurn === "computer"){
        choosePieceComputer();
    } 
}