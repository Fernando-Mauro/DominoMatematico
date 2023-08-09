const Player = require("./Player.js");
const { generatePieces, startGame, isValidPiece } = require("../logic/index.js");
const assert = require("assert");
class Game {
   constructor({ socket, gameId, userName, gameMode }) {
      this.owner = new Player(socket, userName);
      this.gameId = gameId;
      this.gameMode = gameMode;
      this.pieces = this.generatePieces();
      this.players = [this.owner];
      this.startedGame = false;
      this.queueGame = [-1 , -1];
      this.turn = undefined;
      this.double = false;
      this.usedNumber = 0;
      this.notUsed = [];
   }

   checkIsClosed() {
      const head = typeof (this.queueGame[0].first) === "string" ? this.queueGame[0].second : this.queueGame[0].first;
      const tail = typeof (this.queueGame.at(-1).first) === "string" ? this.queueGame.at(-1).second : this.queueGame.at(-1).first;

      let bandera = true;

      // Iterar sobre las piezas no utilizadas
      for (const notUse of this.notUsed) {
         // comprobar con head
         if (notUse.first == head || notUse.second == head) {
            bandera = false;
            return bandera;
         }

         // comprobar con tail
         if (notUse.first == tail || notUse.second == tail) {
            bandera = false;
            return bandera;
         }
      }

      // Iterar sobre las manos de ambos jugadores
      this.players.forEach(player => {
         player.hand.forEach(notUse => {
            // comprobar con head
            if (notUse.first == head || notUse.second == head) {
               bandera = false;
               return bandera;

            }

            // comprobar con tail
            if (notUse.first == tail || notUse.second == tail) {
               bandera = false;
               return bandera;

            }
         })
      });
      if (bandera == true) {
         // this.countPoints();
         console.log('Cerrado D:');
      }
      return bandera;
   }

   generatePieces() {
      return generatePieces();
   }
   // start game
   startGame() {
      const boundStartGame = startGame.bind(this);
      boundStartGame();
   }

   deletePieceFromHand({ first, second }) {
      this.players.forEach(player => {
         player.hand.forEach((piece, index) => {
            if (piece.first == first && piece.second == second || piece.first == second && piece.second == first) {
               player.hand.splice(index, 1);
               return;
            }
         });
      });
   }

   pushingPiece(piece) {
      const boundIsValidPiece = isValidPiece.bind(this, piece);
      return boundIsValidPiece()
   }
   nextTurn() {
      this.turn++;
      if (this.turn >= this.players.length) {
         this.turn = 0;
      }
      // this.players[this.turn].socketPlayer.emit("myTurn", this.players[this.turn].name);
      this.players.forEach((player) => {
         player.socketPlayer.emit("changeCurrentTurn", { name: this.players[this.turn].name });
      });
      // this.checkIsClosed();
   }
   eatPieces() {
      if (this.usedNumber <= 28) {
         const randomNumber = returnRandomPiece(0, 28 - this.usedNumber);
         this.usedNumber++;
         const last = this.notUsed[randomNumber];
         this.notUsed.splice(randomNumber, 1);
         return last;
      }
   }
}
module.exports = Game;