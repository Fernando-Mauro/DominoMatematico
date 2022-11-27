const Player = require("./player.js");

function returnRandomPiece(){
return Math.floor(Math.random() * (28 - 0) + 0);
}

class Game{
constructor(owner, idRoom){
   this.owner = new Player(owner);
   this.idRoom = idRoom;
   this.piezas = this.generarPiezas();
   this.players = [this.owner];
   this.startedGame = false;
   this.queueGame = [];
   this.turn = undefined;
}

// Generar las piezas
generarPiezas(){
   const piezas = [];
   for(let i = 0; i < 7; ++i){
      for(let j = i; j < 7; ++j){
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
startGame(){
   this.players.forEach((player,index) => { 
      while(player.hand.length < 7){
         let positionRandom = returnRandomPiece();
         while(this.piezas[positionRandom].used && positionRandom < 28){
            if(positionRandom == 27){
               positionRandom = 0;
            }else{
               positionRandom++;
            }
         }
         if(this.piezas[positionRandom].first == 6 && this.piezas[positionRandom].second == 6) this.turn = index;
         player.hand.push(this.piezas[positionRandom]);
         this.piezas[positionRandom].used = true;
      }
   });
}
pushingPiece(piece){
   if(piece.isMyTurn){
      if(this.queueGame.length != 0){
         const tail = this.queueGame.at(-1);
         const head = this.queueGame[0];
         let coincide;
         if(piece.first == head.first || piece.first == head.second || piece.second == head.first || piece.second == head.second){
            coincide = (piece.first == head.first ? 1 : piece.first == head.second ? 2 : piece.second == head.first ? 1 : piece.second == head.second ? 2 : undefined);
            if(coincide == 1){
               this.queueGame[0].first = "*";
            }else{
               this.queueGame[0].second = "*";
            }
            this.queueGame.unshift(piece)
            this.nextTurn();
         }else if(piece.first == tail.first || piece.first == tail.second || piece.second == tail.first || piece.second == tail.second){
            coincide = (piece.first == tail.first ? 3 : piece.first == tail.second ? 4 : piece.second == tail.first ? 3 : piece.second == tail.second ? 4 : undefined);
            if(coincide == 3){
               this.queueGame.at(-1).first = "*";
            }else{
               this.queueGame.at(-1).second = "*";
            }
            this.queueGame.push(piece);
            this.nextTurn();
         }else{
            this.players[this.turn].socketPlayer.emit("badPiece");
         }

      }else{
         this.queueGame.push({
            first: piece.first,
            second : piece.second
         });
         this.nextTurn();
      }
      
   }
}
nextTurn(){
   this.turn++;
   if(this.turn >= this.players.length){
      this.turn = 0;
   }
   this.players[this.turn].socketPlayer.emit("myTurn");
}

}
module.exports = Game;
// module.exports = Player;