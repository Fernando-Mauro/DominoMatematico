const onCreateNewGame = require("./onCreateNewGame");
const onJoiningGame = require("./onJoiningGame");
const onStartGame = require("./onStartGame");
const onPushPiece = require("./onPushPiece");
const onSkipTurn = require("./onSkipTurn");
const onEatPiece = require("./onEatPiece");

module.exports = {
    onCreateNewGame, 
    onJoiningGame,
    onPushPiece,
    onStartGame,
    onSkipTurn,
    onEatPiece
};