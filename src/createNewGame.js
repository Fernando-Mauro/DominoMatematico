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
      console.log(piezas.length);
      return piezas;
   }
   // start game
   startGame(){
      this.players.forEach(player => { 
         while(player.hand.length != 7){
            let positionRandom = returnRandomPiece();
            while(this.piezas[positionRandom].used && positionRandom < 28){
               if(positionRandom == 27){
                  positionRandom = 0;
               }else{
                  positionRandom++;
               }
            }
            player.hand.push(this.piezas[positionRandom]);
            this.piezas[positionRandom].used = true;
         }
      });
   }
}
module.exports = Game;
// module.exports = Player;