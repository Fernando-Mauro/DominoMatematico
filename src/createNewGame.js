const Player = require("./player.js");

function returnRandomPiece() {
   return Math.floor(Math.random() * (28 - 0) + 0);
}

class Game {
   constructor(owner, idRoom, userName) {
      this.owner = new Player(owner, userName);
      this.idRoom = idRoom;
      this.piezas = this.generarPiezas();
      this.players = [this.owner];
      this.startedGame = false;
      this.queueGame = [];
      this.turn = undefined;
   }

   // Generar las piezas
   generarPiezas() {
      const piezas = [];
      for (let i = 0; i < 7; ++i) {
         for (let j = i; j < 7; ++j) {
            piezas.push({
               first: i,
               second: j,
               used: false
            });
         }
      }
      return piezas;
   }
   // start game
   startGame() {
      this.players.forEach((player, index) => {
         while (player.hand.length < 7) {
            let positionRandom = returnRandomPiece();
            while (this.piezas[positionRandom].used && positionRandom < 28) {
               if (positionRandom == 27) {
                  positionRandom = 0;
               } else {
                  positionRandom++;
               }
            }
            if (this.piezas[positionRandom].first == 6 && this.piezas[positionRandom].second == 6) this.turn = index;
            player.hand.push(this.piezas[positionRandom]);
            this.piezas[positionRandom].used = true;
         }
      });
   }
   pushingPiece(piece) {
      if (piece.isMyTurn) {
         if (this.queueGame.length != 0) {
            console.log(piece.side);
            if (piece.side == "tail") {
               const tail = this.queueGame.at(-1);
               if (piece.first == tail.first) {
                  piece.first = "*" + piece.first;
                  this.queueGame.at(-1).first = "*";
                  this.queueGame.push(piece);
                  this.nextTurn();
                  return "tail";
               } else if (piece.first == tail.second) {
                  piece.first = "*" + piece.first;
                  this.queueGame.at(-1).second = "*";
                  this.queueGame.push(piece);
                  this.nextTurn();
                  return "tail";
               } else if (piece.second == tail.first) {
                  piece.second = "*" + piece.second;
                  this.queueGame.at(-1).first = "*";
                  this.queueGame.push(piece);
                  this.nextTurn();
                  return "tail";
               } else if (piece.second == tail.second) {
                  piece.second = "*" + piece.second;
                  this.queueGame.at(-1).second = "*";
                  this.queueGame.push(piece);
                  this.nextTurn();
                  return "tail";
               } else {
                  this.players[this.turn].socketPlayer.emit("badPiece");
               }
            } else if (piece.side == "head") {
               const head = this.queueGame[0];
               if (piece.first == head.first) {
                  piece.first = "*" + piece.first;
                  this.queueGame[0].first = "*";
                  this.queueGame.unshift(piece);
                  this.nextTurn();
                  return "head";
               } else if (piece.first == head.second) {
                  piece.first = "*" + piece.first;
                  this.queueGame[0].second = "*";
                  this.queueGame.unshift(piece);
                  this.nextTurn();
                  return "head";
               } else if (piece.second == head.first) {
                  piece.second = "*" + piece.second;
                  this.queueGame[0].first = "*";
                  this.queueGame.unshift(piece);
                  this.nextTurn();
                  return "head";
               } else if (piece.second == head.second) {
                  piece.second = "*" + piece.second;
                  this.queueGame[0].second = "*";
                  this.queueGame.unshift(piece);
                  this.nextTurn();
                  return "head";
               } else {
                  this.players[this.turn].socketPlayer.emit("badPiece");
               }
            }
         }else {
            this.queueGame.push({
               first: piece.first,
               second: piece.second
            });
            this.nextTurn();
            return "middle";
         }
      } 

   }
   nextTurn() {
      this.turn++;
      if (this.turn >= this.players.length) {
         this.turn = 0;
      }
      this.players[this.turn].socketPlayer.emit("myTurn");
   }

}
module.exports = Game;
// module.exports = Player; 