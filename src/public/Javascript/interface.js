const socket = io();

let lastFirst, lastSecond;
let isMyTurn = false;
let queueGame = [];
let lastContainPiece = "";
const piecesCode = ["one-ball", "two-balls", "three-balls", "four-balls", "five-balls", "six-balls"];

// Create a new game
const newGameBtn = document.querySelector("#btn-new-game");
newGameBtn.addEventListener("click", () => {
   const userName = document.querySelector("#input-name")
   if(userName.value.length != 0){
      socket.emit("newGame", userName.value);
   }
});

//Event when return pieces and idRoom 
socket.on("newGameCreate", (data) => {
   remakeDom(data);
   ownerConstruction();
});

// Join to some room
const joinBtn = document.querySelector("#joinToGame");
joinBtn.addEventListener("click", () => {
   // const idRoom = document.querySelector("#inputId").value;
   // socket.emit("joinGame", idRoom)
   const inputCode = document.querySelector("#codigoGame");
   const userName = document.querySelector("#userNameJoin");
   if(inputCode.value.length != 0 && userName.value.length != 0){
      socket.emit("joinGame", {
         idRoom : inputCode.value,
         userName : userName.value
      });
   }
});
// Joined succesfully
socket.on("connectedRoom", (data) => {
   console.log("Te has unido a la sala");
   remakeDom(data)
});
// catch errors
socket.on("error", (data) => {
   console.error(data);
});

function remakeDom(data){
   const container = document.querySelector("#new-game-modal");
   const modal = new Modal(container);
   modal.hide();
   document.querySelector("[modal-backdrop]").remove();
   // Re-make the DOM
   document.querySelector("#main-container").remove();
   const handContainer = document.createElement('div');
   handContainer.classList.add("w-full", "flex", "justify-around", "mb-5");
   handContainer.setAttribute("id", "pieces-container");
   const nodeReference = document.getElementById("popup-modal");
   const parentNode = document.getElementsByTagName("body");
   parentNode[0].insertBefore(handContainer, nodeReference);
   const tableGame = document.createElement("main");
   tableGame.classList.add("table-game", "w-full", "h-auto", "min-h-[100px]", "bg-creme-black");
   tableGame.setAttribute("id", "gameContainer");
   parentNode[0].insertBefore(tableGame, handContainer);
   const containerSpan = document.createElement("div");
   containerSpan.setAttribute("id", "containerSpan");
   containerSpan.classList.add("w-full", "text-center", "font-bold", "text-xl", "text-red-600");
   containerSpan.innerText = "El id de tu juego es: ";
   const span = document.createElement("span");
   span.classList.add("text-black", "text-center", "w-full");
   span.textContent = data.idRoom;
   containerSpan.appendChild(span);
   parentNode[0].insertBefore(containerSpan, tableGame);
}

// Agregar boton para iniciar la partida, solo al dueño 
function ownerConstruction(){
   const button = document.createElement("button");
   button.setAttribute("type", "button");
   button.setAttribute("id", "btn-start");
   button.classList.add("block", "px-6", "py-2.5", "bg-green-500" ,"text-white" ,"font-medium", "text-xs", "leading-tight", "uppercase", "rounded", "shadow-md", "hover:bg-green-600", "hover:shadow-lg", "focus:bg-green-600", "focus:shadow-lg" ,"focus:outline-none", "focus:ring-0", "active:bg-green-700", "active:shadow-lg", "transition", "duration-150", "ease-in-out", "mx-auto", "my-4");
   button.textContent = "Iniciar Juego";
   document.querySelector("#containerSpan").appendChild(button);
   button.addEventListener("click", () => {
      socket.emit("startGame");
   });
}

// Recibir las piezas cuando se inicia el juego
socket.on("sendPieces", data => {
   try{
      const button = document.querySelector("#btn-start");
      button.remove();
   }catch(err){
      // si
   }
   // Si es el turno
   const spanActive = document.createElement("span");
   spanActive.classList.add("block","text-center", "mx-auto","bg-green-400", "text-green-800", "text-md", "font-medium","px-2.5", "py-0.5", "rounded", "hidden");
   spanActive.textContent = "Es tu turno";
   spanActive.setAttribute("id", "turn-enable");
   // Si no es el turno
   const spanInactive = document.createElement("span");
   spanInactive.classList.add("block","text-center", "mx-auto","bg-red-400" ,"text-red-800" ,"text-md","font-medium", "px-2.5" ,"py-0.5" ,"rounded");
   spanInactive.textContent = "No es tu turno";
   spanInactive.setAttribute("id", "turn-disable");
   // agregarlos al dom
   const parentNode = document.getElementsByTagName("body");
   parentNode[0].insertBefore(spanActive, document.querySelector("#pieces-container"));
   parentNode[0].insertBefore(spanInactive, document.querySelector("#pieces-container"));

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
      });

   })
});
// Activar el turno
function activeTurn() {
   const turnActive = document.querySelector("#turn-enable");
   const turnDisactive = document.querySelector("#turn-disable");
   turnActive.classList.toggle("hidden");
   turnDisactive.classList.toggle("hidden");
   isMyTurn = true;
}
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
socket.on("sendQueue", (data) => {
   queueGame = data.queueGame;
   construirCola(data);
});
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
socket.on("myTurn", () => {
   activeTurn();
});
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