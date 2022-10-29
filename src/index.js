const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer); 

const path = require('path');
app.use(express.static(path.join(__dirname, 'views')))

const socketsOnline = [];

// servidor con http
app.get('/', (req, res) => {
   res.sendFile(__dirname + "/views/index.html")
});

// Servidor con web sockets
io.on('connection', socket => {
   socketsOnline.push(socket);
   console.log(`Clientes conectados: ${io.engine.clientsCount}`);
   console.log(`Id del socket conectado: ${socket.id}`);
   socket.on('disconnect', () => {
      console.log(`El socket ${socket.id} se ha desconectado`)
   });

   socket.conn.once(`upgrade`, () => {
      console.log(`Hemos pasado de http long polling a ${socket.conn.transport.name}`);
   });

   // Emision basica
   socket.emit("newGame","Ahora estas conectado 😎")
   // Escuchar evento del cliente
   socket.on("serverClick", (data) => {
      console.warn(data);
   });

   // emision a todos
   io.emit("everyone", socket.id + " se ha conectado");

   // emision a uno solo
   
});

httpServer.listen(3300);