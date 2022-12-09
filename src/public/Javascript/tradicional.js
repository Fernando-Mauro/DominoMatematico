const socket = io();

let lastFirst, lastSecond;
let isMyTurn = false;
let queueGame = [];
let lastContainPiece = "";
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
   if (isMyTurn) {
      activeTurn();
      isMyTurn = false;
      socket.emit("skipTurn");
   }
});
socket.on("connectedRoom", () => {
   alert("Te has conectado a la sala correctamente");
});

const pushHead = document.getElementById("push-head");
const pushTail = document.getElementById("push-tail");
pushHead.addEventListener("click",() => {
   comprobatePiece(lastFirst, lastSecond, "head");
   const hiddenModal = document.getElementById("popup-modal");
   const modal = new Modal(hiddenModal);
   modal.hide();
   let body = document.getElementsByTagName("body");
   let backDrop = body[0].lastChild;
   body[0].removeChild(backDrop);
   backDrop = body[0].lastChild;
   body[0].removeChild(backDrop);
});
pushTail.addEventListener("click",() => {
   comprobatePiece(lastFirst, lastSecond, "tail");
   const hiddenModal = document.getElementById("popup-modal");
   const modal = new Modal(hiddenModal);
   modal.hide();
   let body = document.getElementsByTagName("body");
   let backDrop = body[0].lastChild;
   body[0].removeChild(backDrop);
   backDrop = body[0].lastChild;
   body[0].removeChild(backDrop);
});
         
function comprobatePiece(first, second, side){
   if (queueGame.length != 0) {
      if (isMyTurn && isValid({ first: first, second: second, side: side })) {
         socket.emit("pushPiece", { first: first, second:second, isMyTurn, id: socket.id, side: side });
         activeTurn();
         isMyTurn = false;
         lastContainPiece.innerHTML = "";
      }
   } else {
      socket.emit("pushPiece", { first: first, second: second, isMyTurn, id: socket.id });
      activeTurn();
      isMyTurn = false;
      lastContainPiece.innerHTML = "";
   }
}
socket.on("sendPieces", data => {
   const piecesContainer = document.querySelector("#pieces-container");
   data.pieces.forEach(piece => {
      if (piece.first == 6 && piece.second == 6) {
         isMyTurn = true;
         activeTurn();
      }
      const containPiece = document.createElement("div");
      containPiece.classList.add("piece");

      const topHalf = document.createElement("div");
      topHalf.classList.add("top-half-column", `${piecesCode[piece.first - 1]}`);
      for (let i = 0; i < piece.first; ++i) {
         const bolita = document.createElement("div");
         bolita.classList.add("bolita");
         topHalf.appendChild(bolita);
      }

      const bottomHalf = document.createElement("div");
      bottomHalf.classList.add("bottom-half-column", `${piecesCode[piece.second - 1]}`);
      for (let i = 0; i < piece.second; ++i) {
         const bolita = document.createElement("div");
         bolita.classList.add("bolita");
         bottomHalf.appendChild(bolita);
      }

      containPiece.appendChild(topHalf);
      containPiece.appendChild(bottomHalf);
      piecesContainer.appendChild(containPiece);
      containPiece.addEventListener("click", () => {
        if(queueGame.length != 0){
            const hiddenModal = document.getElementById("popup-modal");
            const modal = new Modal(hiddenModal);
            modal.show();
            // console.log(piece.path[1].childNodes[0],piece.path[1].childNodes[1]);
            lastFirst = piece.first;
            lastSecond = piece.second;
            lastContainPiece = containPiece;
        }else{
         lastFirst = piece.first;
            lastSecond = piece.second;
            lastContainPiece = containPiece;
            comprobatePiece(piece.first, piece.second, "middle");
        }
         // modal.hide();
         // pushHead.addEventListener("click", () => {
         //    comprobatePiece(piece.first, piece.second);
         //    modal.hide();
         //    const body = document.getElementsByTagName("body");
         //    const backDrop = body[0].lastChild;
         //    body[0].removeChild(backDrop);
         // });
         // pushTail.addEventListener("click", () => {
         //    comprobatePiece(piece.first, piece.second);
         //    modal.hide();
         //    const body = document.getElementsByTagName("body");
         //    const backDrop = body[0].lastChild;
         //    body[0].removeChild(backDrop);
         //    // hiddenModal.classList.toggle("hidden");
         // });
         // if (queueGame.length != 0) {
         //    if (isMyTurn && isValid({ first: piece.first, second: piece.second })) {
         //       socket.emit("pushPiece", { first: piece.first, second: piece.second, isMyTurn, id: socket.id });
         //       activeTurn();
         //       isMyTurn = false;
         //       containPiece.innerHTML = "";
         //    }
         // } else {
         //    socket.emit("pushPiece", { first: piece.first, second: piece.second, isMyTurn, id: socket.id });
         //    activeTurn();
         //    isMyTurn = false;
         //    containPiece.innerHTML = "";
         // }

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
   construirCola(data);
});

function activeTurn() {
   const turnActive = document.querySelector("#turn-enable");
   const turnDisactive = document.querySelector("#turn-disable");
   turnActive.classList.toggle("hidden");
   turnDisactive.classList.toggle("hidden");
   isMyTurn = true;
}

function isValid(piece) {
   if (queueGame.length != 0) {
      if(piece.side == "tail"){
         const tail = queueGame.at(-1);
         if (piece.first == tail.first || piece.first == tail.second || piece.second == tail.first || piece.second == tail.second) {
            return true;
         }
      }else if(piece.side == "head"){
         const head = queueGame[0];
         if (piece.first == head.first || piece.first == head.second || piece.second == head.first || piece.second == head.second) {
            return true;
         }
      }
      return false;
   }
}

function construirCola(data) {
   const contenedor = document.getElementById("gameContainer");
   const lastPiece = data.lastPiece;
   console.log(data);
   if (lastPiece == "tail") {
      console.log("Tail");
      if (typeof (data.queueGame.at(-1).first) == 'string') {
         const topHalf = document.createElement("div");
         let size = data.queueGame.at(-1).first.length;
         let numberBallsTop;
         if (size == undefined) {
            numberBallsTop = data.queueGame.at(-1).first;
         } else {
            numberBallsTop = data.queueGame.at(-1).first[size - 1];
         }
         numberBallsTop = parseInt(numberBallsTop);
         for (let i = 0; i < numberBallsTop; i++) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            topHalf.appendChild(bolita);
         }

         const bottomHalf = document.createElement("div");
         size = data.queueGame.at(-1).second.length;
         let numberBallsBottom;
         if (size == undefined) {
            numberBallsBottom = data.queueGame.at(-1).second;
         } else {
            numberBallsBottom = data.queueGame.at(-1).second[size - 1];
         }
         const rowCase = (numberBallsBottom == numberBallsTop)? '-row': '-column';
         numberBallsBottom = parseInt(numberBallsBottom);
         bottomHalf.classList.add(`bottom-half${rowCase}`, piecesCode[numberBallsBottom - 1]);
         topHalf.classList.add(`top-half${rowCase}`, piecesCode[numberBallsTop - 1]);
         for (let i = 0; i < numberBallsBottom; i++) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            bottomHalf.appendChild(bolita);
         }
         const containPiece = document.createElement("div");
         containPiece.classList.add(`piece${rowCase}`);
         containPiece.appendChild(topHalf);
         containPiece.appendChild(bottomHalf);
         contenedor.appendChild(containPiece);
      } else {
         const topHalf = document.createElement("div");
         let size = data.queueGame.at(-1).second.length;
         let numberBallsTop;
         if (size == undefined) {
            numberBallsTop = data.queueGame.at(-1).second;
         } else {
            numberBallsTop = data.queueGame.at(-1).second[size - 1];
         }
         numberBallsTop = parseInt(numberBallsTop);
         topHalf.classList.add("top-half", piecesCode[numberBallsTop - 1]);
         for (let i = 0; i < numberBallsTop; i++) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            topHalf.appendChild(bolita);
         }

         const bottomHalf = document.createElement("div");
         size = data.queueGame.at(-1).first.length;
         let numberBallsBottom;
         if (size == undefined) {
            numberBallsBottom = data.queueGame.at(-1).first;
         } else {
            numberBallsBottom = data.queueGame.at(-1).first[size - 1];
         }

         numberBallsBottom = parseInt(numberBallsBottom);
         const rowCase = (numberBallsBottom == numberBallsTop)? '-row': '-column';
         bottomHalf.classList.add(`bottom-half${rowCase}`, piecesCode[numberBallsBottom - 1]);
         topHalf.classList.add(`top-half${rowCase}`, piecesCode[numberBallsTop - 1]);
         for (let i = 0; i < numberBallsBottom; i++) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            bottomHalf.appendChild(bolita);
         }
         const containPiece = document.createElement("div");
         containPiece.classList.add(`piece${rowCase}`);
         containPiece.appendChild(topHalf);
         containPiece.appendChild(bottomHalf);
         contenedor.appendChild(containPiece);
      }

   } else if (lastPiece == "head") {
      console.log("Head");
      if (typeof (data.queueGame[0].first) == 'string') {
         const lastElementHead = document.getElementById("gameContainer").childNodes[0];
         const topHalf = document.createElement("div");
         let size = data.queueGame[0].second.length;
         let numberBallsTop;
         if (size == undefined) {
            numberBallsTop = data.queueGame[0].second;
         } else {
            numberBallsTop = data.queueGame[0].second[size - 1];
         }

         // Aqui me quede haciendo las comprobaciones
         numberBallsTop = parseInt(numberBallsTop);
         for (let i = 0; i < numberBallsTop; i++) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            topHalf.appendChild(bolita);
         }

         const bottomHalf = document.createElement("div");
         size = data.queueGame[0].first.length;
         let numberBallsBottom;
         if (size == undefined) {
            numberBallsBottom = data.queueGame[0].first;
         } else {
            numberBallsBottom = data.queueGame[0].first[size - 1];
         }
         numberBallsBottom = parseInt(numberBallsBottom);
         const rowCase = (numberBallsBottom == numberBallsTop)? '-row': '-column';
         bottomHalf.classList.add(`bottom-half${rowCase}`, piecesCode[numberBallsBottom - 1]);
         topHalf.classList.add(`top-half${rowCase}`, piecesCode[numberBallsTop - 1]);
         for (let i = 0; i < numberBallsBottom; i++) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            bottomHalf.appendChild(bolita);
         }
         const containPiece = document.createElement("div");
         containPiece.classList.add(`piece${rowCase}`);
         containPiece.appendChild(topHalf);
         containPiece.appendChild(bottomHalf);
         contenedor.insertBefore(containPiece, lastElementHead);
      } else {
         const lastElementHead = document.getElementById("gameContainer").childNodes[0];
         const topHalf = document.createElement("div");
         let size = data.queueGame[0].first.length;
         let numberBallsTop;
         if (size == undefined) {
            numberBallsTop = data.queueGame[0].first;
         } else {
            numberBallsTop = data.queueGame[0].first[size - 1];
         }

         // Aqui me quede haciendo las comprobaciones
         numberBallsTop = parseInt(numberBallsTop);
         for (let i = 0; i < numberBallsTop; i++) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            topHalf.appendChild(bolita);
         }

         const bottomHalf = document.createElement("div");
         size = data.queueGame[0].second.length;
         let numberBallsBottom;
         if (size == undefined) {
            numberBallsBottom = data.queueGame[0].second;
         } else {
            numberBallsBottom = data.queueGame[0].second[size - 1];
         }
         numberBallsBottom = parseInt(numberBallsBottom);
         const rowCase = (numberBallsBottom == numberBallsTop)? '-row': '-column';
         bottomHalf.classList.add(`bottom-half${rowCase}`, piecesCode[numberBallsBottom - 1]);
         topHalf.classList.add(`top-half${rowCase}`, piecesCode[numberBallsTop - 1]);
         for (let i = 0; i < numberBallsBottom; i++) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            bottomHalf.appendChild(bolita);
         }
         const containPiece = document.createElement("div");
         containPiece.classList.add(`piece${rowCase}`);
         containPiece.appendChild(topHalf);
         containPiece.appendChild(bottomHalf);
         contenedor.insertBefore(containPiece, lastElementHead);
      }
   } else if (lastPiece == "middle") {
      console.log("middle");
      const topHalf = document.createElement("div");
      let numberBallsTop = data.queueGame[0].first;
      numberBallsTop = parseInt(numberBallsTop);
      topHalf.classList.add("top-half-row", piecesCode[numberBallsTop - 1]);
      for (let i = 0; i < numberBallsTop; i++) {
         const bolita = document.createElement("div");
         bolita.classList.add("bolita");
         topHalf.appendChild(bolita);
      }

      const bottomHalf = document.createElement("div");
      let numberBallsBottom = data.queueGame[0].first;
      numberBallsBottom = parseInt(numberBallsBottom);
      bottomHalf.classList.add("bottom-half-row", piecesCode[numberBallsBottom - 1]);
      for (let i = 0; i < numberBallsBottom; i++) {
         const bolita = document.createElement("div");
         bolita.classList.add("bolita");
         bottomHalf.appendChild(bolita);
      }
      const containPiece = document.createElement("div");
      containPiece.classList.add("piece-row");
      containPiece.appendChild(topHalf);
      containPiece.appendChild(bottomHalf);
      contenedor.appendChild(containPiece);
   }
}