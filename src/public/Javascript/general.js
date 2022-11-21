const socket = io();

let isMyTurn = false;

const piecesCode = ["one-ball", "two-balls", "three-balls", "four-balls", "five-balls", "six-balls"];
// Create a new game
const newGameBtn = document.querySelector("#newGameBtn");
newGameBtn.addEventListener("click", () => {
   socket.emit("newGame");
});
socket.on("newGameCreate", (data) => {
   const spanIdRoom = document.querySelector("#idRoom");
   spanIdRoom.textContent = data.idRoom;
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
   const piecesContainer = document.querySelector("#pieces-container");
   data.pieces.forEach(piece => {
      if(piece.first == 6 && piece.second == 6){
         isMyTurn = true;
         console.warn('es tu turno');
      } 
      const containPiece = document.createElement("div");
      containPiece.classList.add("piece");

      const topHalf = document.createElement("div");
      topHalf.classList.add("top-half", `${piecesCode[piece.first - 1]}`);
      for(let i = 0; i < piece.first; ++i){
         const bolita = document.createElement("div");
         bolita.classList.add("bolita");
         topHalf.appendChild(bolita);
      }

      const bottomHalf = document.createElement("div");
      bottomHalf.classList.add("bottom-half", `${piecesCode[piece.second - 1]}`);
      for(let i = 0; i < piece.second; ++i){
         const bolita = document.createElement("div");
         bolita.classList.add("bolita");
         bottomHalf.appendChild(bolita);
      }

      containPiece.appendChild(topHalf);
      containPiece.appendChild(bottomHalf);
      
      piecesContainer.appendChild(containPiece);
      containPiece.addEventListener("click",() => {
         if(isMyTurn){
            socket.emit("pushPiece", {first: piece.first,second: piece.second, isMyTurn});
            isMyTurn = false;
         }
      });
      
   })
});

// Catch errors
socket.on("error", (data) => {
   console.error(data);
});

socket.on("myTurn", () => {
   console.log("%c Es tu turno", "color:green; background-color:white");
   isMyTurn = true;
});