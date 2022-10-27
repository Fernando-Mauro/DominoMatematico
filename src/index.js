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

   console.log(`Clientes conectados: ${io.engine.clientsCount}`);
   console.log(`Id del socket conectado: ${socket.id}`);
   socket.on('disconnect', () => {
      console.log(`El socket ${socket.id} se ha desconectado`)
   });

   socket.conn.once(`upgrade`, () => {
      console.log(`Hemos pasado de http long polling a ${socket.conn.transport.name}`);
   });
});

httpServer.listen(3000);