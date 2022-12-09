class Player{
   constructor(socketPlayer, name){
      this.socketPlayer = socketPlayer;
      this.hand = [];
      this.name = name;
   }
}
module.exports = Player;