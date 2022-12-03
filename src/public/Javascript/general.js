const socket = io();

let isMyTurn = false;
let queueGame = [];

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
   socket.emit("joinGame", idRoom)
});

// Start the game
const startBtn = document.querySelector("#startGame");
startBtn.addEventListener("click", () => {
   socket.emit("startGame");
});

const skipTurn = document.querySelector("#skip-turn");
skipTurn.addEventListener("click", () => {
   if(isMyTurn){
      activeTurn();
      isMyTurn = false;
      socket.emit("skipTurn");
   }
});
socket.on("sendPieces", data => {
   const piecesContainer = document.querySelector("#pieces-container");
   data.pieces.forEach(piece => {
      if(piece.first == 6 && piece.second == 6){
         isMyTurn = true;
         activeTurn();
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
         if(queueGame.length != 0){
            if(isMyTurn && isValid({first: piece.first,second: piece.second})){
               console.log('Enviando una pieza');
               socket.emit("pushPiece", {first: piece.first,second: piece.second, isMyTurn, id: socket.id});
               // isMyTurn = false;
               activeTurn();
               isMyTurn = false;
               containPiece.innerHTML = "";
            }
         }else{
            socket.emit("pushPiece", {first: piece.first,second: piece.second, isMyTurn, id: socket.id});
            activeTurn();
            isMyTurn = false;
            containPiece.innerHTML = "";
         }
         
      });
      
   })
});

// Catch errors
socket.on("error", (data) => {
   console.error(data);
});

socket.on("myTurn", () => {
   activeTurn();
});

socket.on("badPiece", () => {
   alert('Pieza invalida');
   activeTurn();
});

socket.on("sendQueue", (data) => {
   queueGame = data.queueGame;
   console.log(queueGame);
})
function activeTurn(){
   const turnActive = document.querySelector("#turn-enable");
   const turnDisactive = document.querySelector("#turn-disable");
   turnActive.classList.toggle("hidden");
   turnDisactive.classList.toggle("hidden");
   isMyTurn = true;
}
function isValid(piece){
   if(queueGame.length != 0){
      const tail = queueGame.at(-1);
      const head = queueGame[0];
      const coincide = (piece.first == head.first ? 1 : piece.first == head.second ? 2 : piece.second == head.first ? 1 : piece.second == head.second ? 2 : undefined);
      console.log(coincide);
      if(piece.first == head.first || piece.first == head.second || piece.second == head.first || piece.second == head.second){
         return true;
      }else if(piece.first == tail.first || piece.first == tail.second || piece.second == tail.first || piece.second == tail.second){
         return true;
      }else{
         return false;
      }
   }
}