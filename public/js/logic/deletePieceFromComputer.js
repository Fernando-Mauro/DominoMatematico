import { getComputerPieces, setComputerPieces } from "../computerSharedModule.js"

export const deletePieceFromComputer = (piece) => {
    const computerPieces = getComputerPieces();

    const newComputerPieces = computerPieces.filter(el => {
        if (el.first === piece.first && el.second === piece.second){
           return false; 
        }
        return true;
    });

    setComputerPieces(newComputerPieces);

    console.log(newComputerPieces);
}