const Player = require("./player.js");

function returnRandomPiece() {
   return Math.floor(Math.random() * (28 - 0) + 0);
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
            let positionRandom = returnRandomPiece();

            while (this.piezas[positionRandom].used && positionRandom < 28) {
               positionRandom = positionRandom === 27 ? 0 : positionRandom + 1;
            }
            // Si aleatoriamente se asigna la mula del 6 el primer turno es del jugador con la mula del 6
            if (this.piezas[positionRandom].first === 6 && this.piezas[positionRandom].second === 6){
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
         if(!pieza.used){
            this.notUsed.push(pieza);
         }
      });
      
      // Si no se repartio la mula del 6
      let bandera = true;
      if(!this.mula){
         for(let i = 5; i >= 0; --i){
            this.players.forEach((player, index) => {
               player.hand.forEach(pieza => {
                  if(pieza.first == i && pieza.second == i && bandera){
                     this.turn = index;
                     bandera = false;
                     return;
                  }
               })
            })
         }
      }
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
                  return {
                     side: "tail",
                     half: "first"
                  };
               } else if (piece.first == tail.second) {
                  piece.first = "*" + piece.first;
                  this.queueGame.at(-1).second = "*";
                  this.queueGame.push(piece);
                  this.nextTurn();
                  return {
                     side: "tail",
                     half: "first"
                  };
               } else if (piece.second == tail.first) {
                  piece.second = "*" + piece.second;
                  this.queueGame.at(-1).first = "*";
                  this.queueGame.push(piece);
                  this.nextTurn();
                  return {
                     side: "tail",
                     half: "second"
                  };
               } else if (piece.second == tail.second) {
                  piece.second = "*" + piece.second;
                  this.queueGame.at(-1).second = "*";
                  this.queueGame.push(piece);
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
                  this.nextTurn();
                  return {
                     side: "head",
                     half: "first"
                  };
               } else if (piece.first == head.second) {
                  piece.first = "*" + piece.first;
                  this.queueGame[0].second = "*";
                  this.queueGame.unshift(piece);
                  this.nextTurn();
                  return {
                     side: "head",
                     half: "first"
                  };
               } else if (piece.second == head.first) {
                  piece.second = "*" + piece.second;
                  this.queueGame[0].first = "*";
                  this.queueGame.unshift(piece);
                  this.nextTurn();
                  return {
                     side: "head",
                     half: "second"
                  };
               } else if (piece.second == head.second) {
                  piece.second = "*" + piece.second;
                  this.queueGame[0].second = "*";
                  this.queueGame.unshift(piece);
                  this.nextTurn();
                  return {
                     side: "head",
                     half: "second"
                  };
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
            return {
               side: "middle",
               half: undefined
            };
         }
      } 

   }
   nextTurn() {
      this.turn++;
      if(this.turn >= this.players.length) {
         this.turn = 0;
      }
      // this.players[this.turn].socketPlayer.emit("myTurn", this.players[this.turn].name);
      this.players.forEach((player) => {
         player.socketPlayer.emit("changeCurrentTurn", {name: this.players[this.turn].name});
      })
   }
   eatPieces(){
      if(this.numberUse <= 28){
         this.numberUse++;
         const last = this.notUsed[0];
         this.notUsed.shift();
         return last;
      }
   }
}
module.exports = Game;
// module.exports = Player; 