// Requerir express
const express = require('express');

const {createServer} = require('http');

const {Server} = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer); 
// Para crear ID unicos

const uuidv4 = require("uuid");
// Clases que intervienen
const Game = require("./createNewGame.js");
const Player = require("./player.js")

const path = require('path');
// app.use(express.static(path.join(__dirname, '../node_modules/flowbite/dist/flowbite.js')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/Html')));

app.get("/node_modules/flowbite/dist/flowbite.js", (req, res) => {
   res.sendFile(path.resolve(__dirname + "/../node_modules/flowbite/dist/flowbite.js"))
});
// servidor con http
app.get('/', (req, res) => {
   res.sendFile(  __dirname + "/public/Html/index.html")
});

// Juegos activos
const gamesInline = new Map();


// Cuando se conecte un usuario
io.on("connection", (socket) => {
   console.log(`Un nuevo jugador se ha conectado: ${io.engine.clientsCount}`);

   socket.connectedRooms = [];

   // Create a new game
   socket.on("newGame", (userName) => {
      
      // Leave all rooms
      if(socket.connectedRooms.length != 0){
         socket.connectedRooms.forEach(room => socket.leave(room));
      }

      const idRoom = uuidv4.v4().split("-")[0];
      const newGame = new Game(socket, idRoom, userName);

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
   socket.on("joinGame", (data) => {
      if(gamesInline.has(data.idRoom) && socket.rooms.size == 1 && gamesInline.get(data.idRoom).players.length < 4){
         const memberRoom = new Player(socket, data.userName);
         gamesInline.get(data.idRoom).players.push(memberRoom);
         socket.join(data.idRoom);
         socket.emit("connectedRoom", {
            idRoom: data.idRoom
         });
      }else{
         socket.emit("error", {
            message : "No existe la sala o ya te encuentras en otra sala",
            id : data.idRoom
         });
      }
   });

   // Start the game
   socket.on("startGame", () => {
      
      // Comenzar el juego (repartir piezas y asignar turno)
      socket.actualGame.startGame();

      // Comprobar que el juego no se intente iniciar dos veces
      if(socket.actualGame.startedGame) return;

      // Emitir los eventos de enviar piezas a cada jugador
      socket.actualGame.players.forEach((player, index) => {
         player.socketPlayer.emit("sendPieces", {
            pieces: player.hand
         });
         if(socket.actualGame.turn === index){
            player.socketPlayer.emit("turn", {
               name: player.name
            })
         }else{
            const { name } = socket.actualGame.players[socket.actualGame.turn];
            player.socketPlayer.emit("notTurn", {
               name: name
            })
         }
      });

      socket.actualGame.startedGame = true;
   });


   // Pushing a piece
   socket.on("pushPiece", (piece) => {
      const arrId = [...socket.rooms];
      const last = gamesInline.get(arrId[1]).pushingPiece(piece);

      io.in(arrId[1]).emit("sendQueue", {
         queueGame: gamesInline.get(arrId[1]).queueGame,
         lastPiece : last
      });
   });
   socket.on("skipTurn", () => {
      const arrId = [...socket.rooms];
      gamesInline.get(arrId[1]).nextTurn();
   });
   socket.on("eat-piece", () => {
      const arrId = [...socket.rooms];
      if(gamesInline.get(arrId[1]).players.length < 4){
         const piece = gamesInline.get(arrId[1]).eatPieces();
         socket.emit("eatedPiece", piece);
      }
   });
   socket.on("winner", (data) => {
      const arrId = [...socket.rooms];
      // gamesInline.get(arrId[1]).nextTurn();
      gamesInline.get(arrId[1]).players.forEach(player => {
         player.socketPlayer.emit("winner", data);
      })
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