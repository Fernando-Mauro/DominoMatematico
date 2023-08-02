const emitWinner = require("./emitWinner");
const onCreateNewGame = require("./onCreateNewGame");
const onEatPiece = require("./onEatPiece");
const onFinishGame = require("./onFinishGame");
const onJoiningGame = require("./onJoiningGame");
const onPushPiece = require("./onPushPiece");
const onSkipTurn = require("./onSkipTurn");
const onStartGame = require("./onStartGame");

module.exports = {
    emitWinner,
    onCreateNewGame, 
    onEatPiece,
    onFinishGame,
    onJoiningGame,
    onPushPiece,
    onSkipTurn,
    onStartGame,
};