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

socket.on("sendPieces", data => {
   data.pieces.forEach(piece => {
      const containPiece = document.createElement("div");
      containPiece.classList.add("piece");
      const topHalf = document.createElement("div");
      topHalf.classList.add("top-half", "")
   })
});


`
<div class="piece">
      <div class="top-half one-ball">
         <div class="bolita"></div>
      </div>
      <div class="bottom-half">

      </div>
</div>
`




// Catch errors
socket.on("error", (data) => {
   console.error(data);
})