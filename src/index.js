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

const teachers = io.of("teachers");
const students = io.of("students");

teachers.on("connection", socket => {
   socket.on("send-message", (data) => {
      emitMessage(data, teachers);
   });
   // console.log("Namespace de maestros conectado");
});

students.on("connection", socket => {
   // console.log("Namespace de estudiantes conectado");
   socket.on("send-message", (data) => {
      emitMessage(data, students);
   })
});

function emitMessage(data, user){
   user.emit("mensaje", data);
}
httpServer.listen(3300);