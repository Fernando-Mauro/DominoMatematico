// Usando express
const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer); 
const uuidv4 = require("uuid");
const Game = require("./createNewGame.js");
const Player = require("./player.js")
const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/Html')));


// servidor con http
app.get('/', (req, res) => {
   res.sendFile(  __dirname + "/public/Html/index.html")
});

// Juegos activos
const gamesInline = new Map();

// Cuando se conecte un usuario
io.on("connection", (socket) => {
   socket.connectedRooms = [];
   console.log(`El socket ${socket.id} se ha conectado`);
   // Create a new game
   socket.on("newGame", () => {
      // Leave all rooms
      if(socket.connectedRooms.length != 0){
         socket.connectedRooms.forEach(room => socket.leave(room));
      }

      const idRoom = uuidv4.v4().split("-")[0];
      const newGame = new Game(socket, idRoom);

      // Crear la sala
      socket.join(idRoom);
      socket.actualGame = newGame;
      socket.connectedRooms.push(idRoom);
      gamesInline.set(idRoom, newGame);

      socket.emit("newGameCreate", {
         piezas: newGame.piezas,
         idRoom : newGame.idRoom
      });
   });

   // Join to room
   socket.on("joinGame", (idRoom) => {
      if(gamesInline.has(idRoom)){
         const memberRoom = new Player(socket);
         gamesInline.get(idRoom).players.push(memberRoom);
         socket.join(idRoom)
      }else{
         socket.emit("error", {
            message : "No existe la sala",
            id : idRoom
         });
      }
   });

   // Start the game
   socket.on("startGame", () => {
      socket.actualGame.startGame();
      if(!socket.actualGame.startedGame){
         socket.actualGame.players.forEach(player => {
            player.socketPlayer.emit("sendPieces", {pieces: player.hand});
         });
      }
      socket.actualGame.startedGame = true;
   });
   // Pushing a piece
   socket.on("pushPiece", (piece) => {
      socket.actualGame.pushingPiece(piece);
   });
   // returns the actives games
   socket.on("inLineGames", () => {
      let llaves = [];
      gamesInline.forEach(gameActive => {
         llaves.push({
            idGame: gameActive.idRoom,
            numberPlayers: gameActive.players.length 
         });
      });   
      // const serializedMap = [...gamesInline.entries()];
      // console.log(JSON.stringify(serializedMap));   
      socket.emit("inLineGames", llaves);
      
   });
});





// Puerto
httpServer.listen(3300);