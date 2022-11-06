const socket = io();

// Create a new game
const newGameBtn = document.querySelector("#newGameBtn");
newGameBtn.addEventListener("click", () => {
   socket.emit("newGame");
});
socket.on("newGameCreate", (data) => {
   console.log(data);
});

// See actives games
const inLineGames = document.querySelector("#gamesInline");
inLineGames.addEventListener("click", () => {
   socket.emit("inLineGames");
});
socket.on("inLineGames", (actives) => {
   console.log(actives);
});

// Join to some room
const joinBtn = document.querySelector("#joinToGame");
joinBtn.addEventListener("click", () => {
   const idRoom = document.querySelector("#inputId").value;
   console.log(idRoom);
   socket.emit("joinGame", idRoom)
});

// Start the game
const startBtn = document.querySelector("#startGame");
startBtn.addEventListener("click", () => {
   socket.emit("startGame");
});









// Catch errors
socket.on("error", (data) => {
   console.error(data);
})