import { setComputerPieces } from "../computerSharedModule.js"

export const onSendedPieces = ({
    pieces,
    gameMode,
    currentTurn
}) => { 
    setComputerPieces(pieces);    
}