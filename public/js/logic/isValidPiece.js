import { getMyTurn, getQueueGame } from "../sharedModule.js";

export const isValidPiece= ({ side, first, second }) => {
    const isTurn = getMyTurn();
    
    if (!isTurn) return;
    const queueGame = getQueueGame();
    // Si no hay nada en la cola 🤡
    const sideQueue = side === "head" ? 0 : 1;
    
    if (side === "middle") {
        return true;
    }else if (first === queueGame[sideQueue] || second === queueGame[sideQueue]) {
        return true;
    }
    return false;
}