function returnRandomPiece(){
   return Math.floor(Math.random() * (28 - 0) + 0);
}

class Player{
   constructor(idPlayer){
      this.idPlayer = idPlayer;
      this.hand = [];
   }
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
      return piezas;
   }
   // start game
   startGame(){
      this.players.forEach(player => { 
         while(player.hand.length <= 7){
            const positionRandom = returnRandomPiece();
            console.log(positionRandom);
            if(!this.piezas[positionRandom].used){
               player.hand.push(this.piezas[positionRandom]);
               this.piezas[positionRandom].used = true;
            }
         }
         console.log(player.hand);
      });
   }
}
module.exports = Game;