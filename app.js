const express = require('express');
const app = express();
const port = 3300;

const { createServer } = require('http');
const httpServer = createServer(app);
const { Server } = require('socket.io');

const io = new Server(httpServer);

const path = require('path');

// Routes to any point
const routes = require("./src/Routes/index");
app.use("/", routes);
app.use(express.static(path.join(__dirname, 'public')));

// Clases que intervienen
const { Game , Player} = require("./src/classes/");
const handleSocketEvents = require("./src/handleSocketEvents.js")

// Cuando se conecte un usuario
io.on("connection", handleSocketEvents);

// Puerto
httpServer.listen(port, () => {
    console.log(`Server ready at: http://localhost:${port}/`);
});