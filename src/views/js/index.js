const socket = io();
const send = document.querySelector("#send");
const reconnect = document.querySelector("#reconnect");
const disconnect = document.querySelector("#disconnect");

send.addEventListener("click", () => {
   if(socket.connected)
      socket.emit("isConnect", "!estas conectado?");
});

disconnect.addEventListener("click", () => {
   socket.disconnect();
});

reconnect.addEventListener("click", () => {
   socket.connect();
})