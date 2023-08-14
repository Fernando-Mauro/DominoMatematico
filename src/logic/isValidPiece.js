
function isValidPiece({ isTurn, side, first, second }) {
    if (!isTurn) return;

    let orientation = (first === second) ? "row" : "column";
    let data;
    // Si no hay nada en la cola 🤡
    const sideQueue = side === "head" ? 0 : 1;
    
    if (side === "middle") {
        this.queueGame[0] = first;
        this.queueGame[1] = second;
        this.deletePieceFromHand({ first, second, used: false });
        data = {
            side,
            halves: [first, second],
            match: 0,
            orientation
        }
    }else if (first === this.queueGame[sideQueue]) {
        this.queueGame[sideQueue] = second;
        data = {
            side,
            halves: [first, second],
            orientation,
            match: 0
        }
    }else if (second === this.queueGame[sideQueue]) {
        this.queueGame[sideQueue] = first;
        data = {
            halves: [first, second],
            side,
            orientation,
            match: 1
        }
    }
    this.deletePieceFromHand({ first, second, used: false })
    this.nextTurn();
    return data;
}

module.exports = isValidPiece;