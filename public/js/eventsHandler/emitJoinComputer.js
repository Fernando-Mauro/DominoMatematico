import { getComputerSocket, getGameId } from "../computerSharedModule.js";
import { getGameMode } from "../sharedModule.js";

export const emitJoinComputer = () => {
    const computerSocket = getComputerSocket();    
    const gameMode = getGameMode();
    const gameId = getGameId();
    
    const userName = "computer";
    computerSocket.emit("onJoiningGame", {
        gameId,
        userName,
        gameMode 
    });
};