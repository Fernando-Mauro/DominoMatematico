const generatePieces = () => {
    const pieces = [];
    for (let i = 0; i < 7; ++i) {
        for (let j = i; j < 7; ++j) {
            pieces.push({
                first: i,
                second: j,
                used: false
            });
        }
    }
    return pieces;
}
module.exports = generatePieces;