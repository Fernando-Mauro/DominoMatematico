const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer); 

const path = require('path');
app.use(express.static(path.join(__dirname, 'views')))


// servidor con http
app.get('/', (req, res) => {
   res.sendFile(__dirname + "/views/index.html")
});

// Servidor con web sockets
io.on('connection', socket => {
   socket.connectedRoom = null;
   socket.on("connect-to-room", (room) => {
      if(socket.connectedRoom){
         socket.leave(socket.connectedRoom);
      }
      socket.connectedRoom = room;
      socket.join(room);
   });
   socket.on("message", (message) => {
      const room = socket.connectedRoom;
      io.to(room).emit("send-message", {
         message,
         room
      });
   });
});

httpServer.listen(3300);