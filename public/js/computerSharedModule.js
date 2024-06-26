import { emitJoinComputer } from "./eventsHandler/emitJoinComputer.js";
import { setComputerEvents } from "./logic/setComputerEvents.js";

let computerSocket;
const computerName = "computer";
let gameId;
let pieces = [];
export const setGameId = (id) => {
    gameId = id;
}

export const getGameId = () => {
    return gameId;
}

export const setComputerSocket = () => {
    computerSocket = io.connect();

    computerSocket.on("connect", () => {
        emitJoinComputer();
        setComputerEvents();
    });
};

export const getComputerSocket = () => {
    return computerSocket;
}

export const setComputerPieces = (newPieces) => {
    pieces = [...newPieces];
}

export const getComputerPieces = () => {
    return pieces;
}