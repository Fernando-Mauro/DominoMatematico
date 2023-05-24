const Player = require("./player.js");

function returnRandomPiece(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}

class Game {
   constructor(owner, idRoom, userName, modeGame) {
      this.owner = new Player(owner, userName);
      this.idRoom = idRoom;
      this.piezas = this.generarPiezas();
      this.players = [this.owner];
      this.startedGame = false;
      this.queueGame = [];
      this.turn = undefined;
      this.mula = false;
      this.numberUse = 0;
      this.notUsed = [];
      this.modeGame = modeGame;
   }

   checkIsClosed() {
      const firstHead = typeof (this.queueGame[0].first) === "string" ? parseInt(this.queueGame[0].first.at(-1)) : this.queueGame[0].first;
      const secondHead = typeof (this.queueGame[0].second) === "string" ? parseInt(this.queueGame[0].second.at(-1)) : this.queueGame[0].second;
      const head = {
         first: firstHead,
         second: secondHead
      };

      const firstTail = typeof (this.queueGame.at(-1).first) === "string" ? parseInt(this.queueGame.at(-1).first.at(-1)) : this.queueGame.at(-1).first;
      const secondTail = typeof (this.queueGame.at(-1).second) === "string" ? parseInt(this.queueGame.at(-1).second.at(-1)) : this.queueGame.at(-1).second;
      const tail = {
         first: firstTail,
         second: secondTail
      };
      console.log(tail,head);
      let bandera = true;

      // Iterar sobre las piezas no utilizadas
      for (const notUse of this.notUsed) {
         // comprobar con head
         if (notUse.first == head.first && notUse.second == head.second || notUse.second == head.first && notUse.first == head.second) {
            bandera = false;
         }

         // comprobar con tail
         if (notUse.first == tail.first && notUse.second == tail.second || notUse.second == tail.first && notUse.first == tail.second) {
            bandera = false;
         }
      }

      // Iterar sobre las manos de ambos jugadores
      this.players.forEach(player => {
         player.hand.forEach(notUse => {
            // comprobar con head
            if (notUse.first == head.first && notUse.second == head.second || notUse.second == head.first && notUse.first == head.second) {
               bandera = false;
            }

            // comprobar con tail
            if (notUse.first == tail.first && notUse.second == tail.second || notUse.second == tail.first && notUse.first == tail.second) {
               bandera = false;
            }
         })
      });

      if(bandera){
         console.log('El juego se ha cerrado');
      }else{
         console.log('EL juego sigue');
      }
      return bandera;
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

      // Generar las 7 fichas para cada jugador
      this.players.forEach((player, index) => {
         while (player.hand.length < 7) {
            let positionRandom = returnRandomPiece(0, 28);

            while (this.piezas[positionRandom].used && positionRandom < 28) {
               positionRandom = positionRandom === 27 ? 0 : positionRandom + 1;
            }
            // Si aleatoriamente se asigna la mula del 6 el primer turno es del jugador con la mula del 6
            if (this.piezas[positionRandom].first === 6 && this.piezas[positionRandom].second === 6) {
               this.turn = index;
               this.mula = true;
            }
            player.hand.push(this.piezas[positionRandom]);
            this.piezas[positionRandom].used = true;
            this.numberUse++;
         }
      });

      // Agregar al set las piezas que no se estan ocupando
      this.piezas.forEach(pieza => {
         if (!pieza.used) {
            this.notUsed.push(pieza);
         }
      });

      // Si no se repartio la mula del 6
      let bandera = true;
      if (!this.mula) {
         for (let i = 5; i >= 0; --i) {
            this.players.forEach((player, index) => {
               player.hand.forEach(pieza => {
                  if (pieza.first == i && pieza.second == i && bandera) {
                     this.turn = index;
                     bandera = false;
                     return;
                  }
               })
            })
         }
      }
   }
   deletePieceFromHand({ first, second }) {
      this.players.forEach(player => {
         player.hand.forEach((piece, index) => {
            if (piece.first == first && piece.second == second || piece.first == second && piece.second == first) {
               console.log('llegue');
               player.hand.splice(index, 1);
               return;
            }
         });
      });
   }
   pushingPiece(piece) {
      if (piece.isMyTurn) {
         if (this.queueGame.length != 0) {
            if (piece.side == "tail") {
               const tail = this.queueGame.at(-1);
               if (piece.first == tail.first) {
                  piece.first = "*" + piece.first;
                  this.queueGame.at(-1).first = "*";
                  this.queueGame.push(piece);
                  this.deletePieceFromHand(piece);
                  this.checkIsClosed();
                  this.nextTurn();
                  return {
                     side: "tail",
                     half: "first"
                  };
               } else if (piece.first == tail.second) {
                  piece.first = "*" + piece.first;
                  this.queueGame.at(-1).second = "*";
                  this.queueGame.push(piece);
                  this.deletePieceFromHand(piece);
                  this.checkIsClosed();
                  this.nextTurn();
                  return {
                     side: "tail",
                     half: "first"
                  };
               } else if (piece.second == tail.first) {
                  piece.second = "*" + piece.second;
                  this.queueGame.at(-1).first = "*";
                  this.queueGame.push(piece);
                  this.deletePieceFromHand(piece);
                  this.checkIsClosed();
                  this.nextTurn();
                  return {
                     side: "tail",
                     half: "second"
                  };
               } else if (piece.second == tail.second) {
                  piece.second = "*" + piece.second;
                  this.queueGame.at(-1).second = "*";
                  this.queueGame.push(piece);
                  this.deletePieceFromHand(piece);
                  this.checkIsClosed();
                  this.nextTurn();
                  return {
                     side: "tail",
                     half: "second"
                  };
               } else {
                  this.players[this.turn].socketPlayer.emit("badPiece");
               }
            } else if (piece.side == "head") {
               const head = this.queueGame[0];
               if (piece.first == head.first) {
                  piece.first = "*" + piece.first;
                  this.queueGame[0].first = "*";
                  this.queueGame.unshift(piece);
                  this.deletePieceFromHand(piece);
                  this.checkIsClosed();
                  this.nextTurn();
                  return {
                     side: "head",
                     half: "first"
                  };
               } else if (piece.first == head.second) {
                  piece.first = "*" + piece.first;
                  this.queueGame[0].second = "*";
                  this.queueGame.unshift(piece);
                  this.deletePieceFromHand(piece);
                  this.checkIsClosed();
                  this.nextTurn();
                  return {
                     side: "head",
                     half: "first"
                  };
               } else if (piece.second == head.first) {
                  piece.second = "*" + piece.second;
                  this.queueGame[0].first = "*";
                  this.queueGame.unshift(piece);
                  this.deletePieceFromHand(piece);
                  this.checkIsClosed();
                  this.nextTurn();
                  return {
                     side: "head",
                     half: "second"
                  };
               } else if (piece.second == head.second) {
                  piece.second = "*" + piece.second;
                  this.queueGame[0].second = "*";
                  this.queueGame.unshift(piece);
                  this.deletePieceFromHand(piece);
                  this.checkIsClosed();
                  this.nextTurn();
                  return {
                     side: "head",
                     half: "second"
                  };
               } else {
                  this.players[this.turn].socketPlayer.emit("badPiece");
               }
            }
         } else {
            this.queueGame.push({
               first: piece.first,
               second: piece.second
            });
            this.deletePieceFromHand(piece)
            this.checkIsClosed();
            this.nextTurn();
            return {
               side: "middle",
               half: undefined
            };
         }
      }

   }
   nextTurn() {
      this.turn++;
      if (this.turn >= this.players.length) {
         this.turn = 0;
      }
      // this.players[this.turn].socketPlayer.emit("myTurn", this.players[this.turn].name);
      this.players.forEach((player) => {
         player.socketPlayer.emit("changeCurrentTurn", { name: this.players[this.turn].name });
      })
   }
   eatPieces() {
      if (this.numberUse <= 28) {
         const randomNumber = returnRandomPiece(0, 28 - this.numberUse);
         this.numberUse++;
         const last = this.notUsed[randomNumber];
         this.notUsed.splice(randomNumber, 1);
         return last;
      }
   }
}
module.exports = Game;
// module.exports = Player; 