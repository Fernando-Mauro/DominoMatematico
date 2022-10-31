const socket = io();

// seleccionar botones
const connect1 = document.querySelector("#connect-1"); 
const connect2 = document.querySelector("#connect-2"); 
const connect3 = document.querySelector("#connect-3"); 

// eventos

connect1.addEventListener("click", () => {
   socket.emit("connect-to-room", "room-1");
});
connect2.addEventListener("click", () => {
   socket.emit("connect-to-room", "room-2");
});
connect3.addEventListener("click", () => {
   socket.emit("connect-to-room", "room-3");
});

// Enviar mensaje
const sendMessage = document.querySelector("#send-message");

sendMessage.addEventListener("click", () => {
   const message = prompt("Escribe tu mensaje:");
   socket.emit("message", message);
});

// recibir el mensaje
socket.on("send-message", (data) => {
   const {room,message} = data;
   const li = document.createElement("li");
   li.textContent = message;
   document.querySelector(`#${room}`).appendChild(li);
});