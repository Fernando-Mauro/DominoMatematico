// Usando express
const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer); 
const uuidv4 = require("uuid");
const Game = require("./createNewGame.js");
const path = require('path');
app.use(express.static(path.join(__dirname, '/public')))


// servidor con http
app.get('/', (req, res) => {
   res.sendFile(  __dirname + "/public/pruebas.html")
});

// Juegos activos
const gamesInline = new Map();

// Cuando se conecte un usuario
io.on("connection", (socket) => {
   socket.connectedRooms = [];

   // Create a new game
   socket.on("newGame", () => {
      // Leave all rooms
      if(socket.connectedRooms.length != 0){
         socket.connectedRooms.forEach(room => socket.leave(room));
      }

      const idRoom = uuidv4.v4();
      const newGame = new Game(socket.id, idRoom);

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
         gamesInline.get(idRoom).players.push(socket.id);
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
      console.log(socket.actualGame.players[0].hand);
   });
   // returns the actives games
   socket.on("inLineGames", () => {
      const serializedMap = [...gamesInline.entries()];
      socket.emit("inLineGames", serializedMap);
   });
});





// Puerto
httpServer.listen(3300);