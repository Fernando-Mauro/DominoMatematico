class Game{
   constructor(owner, idRoom){
      this.owner = owner;
      this.idRoom = idRoom;
      this.piezas = this.generarPiezas();
      this.players = [owner];
   }

   // Generar las piezas
   generarPiezas(){
      const piezas = [];
      for(let i = 0; i < 7; ++i){
         for(let j = i; j < 7; ++j){
            piezas.push({
               first: i,
               second: j
            });
         }
      }
      return piezas;
   }
}
module.exports = Game;