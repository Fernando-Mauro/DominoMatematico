
function isValidPiece({ isTurn, side, first, second }) {
    if (!isTurn) return;
    let orientation = (first === second) ? "row" : "column";
    let data;
    // Si no hay nada en la cola 🤡
    if (side === "middle") {
        this.queueGame[0] = first;
        this.queueGame[1] = second;
        this.deletePieceFromHand({ first, second, used: false });
        data = {
            side,
            newFirst: first,
            newSecond: second,
            orientation
        }
    }

    const sideQueue = side === "head" ? 0 : 1;

    if (first === this.queueGame[sideQueue]) {
        this.queueGame[sideQueue] = second;
        data = {
            side,
            newFirst: second,
            orientation,
            newSecond: first
        }
    }
    if (second === this.queueGame[sideQueue]) {
        this.queueGame[sideQueue] = first;
        data = {
            side,
            newFirst: second,
            newSecond: first,
            orientation
        }
    }
    this.deletePieceFromHand({ first, second, used: false })
    this.nextTurn();

    return data;
}

module.exports = isValidPiece;