import { onSendedPieces } from "../computerEventsHandler/onSendedPieces.js";
import { getComputerPieces, getComputerSocket, setComputerPieces } from "../computerSharedModule.js"
import { choosePieceComputer } from "./choosePieceComputer.js";

export const setComputerEvents = () => {
    const computerSocket = getComputerSocket();

    computerSocket.on("sendedPieces", onSendedPieces);

    computerSocket.on("changeCurrentTurn", ({ name }) => {
        if (name === "computer")
            setTimeout(() => {
                choosePieceComputer()
            },3000)
        // choosePieceComputer();
    });

    computerSocket.on("eatedPiece", (piece) => {
        const computerPieces = getComputerPieces();
        const newComputerPieces = [...computerPieces, piece];
        setComputerPieces(newComputerPieces);
        choosePieceComputer(true);
    })
}