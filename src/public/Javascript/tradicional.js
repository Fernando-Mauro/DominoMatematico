const socket = io();
let userName;
let lastFirst, lastSecond;
let isMyTurn = false;
let queueGame = [];
let lastContainPiece = "";
const piecesCode = ["one-ball", "two-balls", "three-balls", "four-balls", "five-balls", "six-balls"];
let modeGame = "tradicional";
let tiempoRestante = 60; // tiempo en segundos
let intervalo;
// Create a new game
const newGameBtn = document.querySelector("#btn-new-game");

newGameBtn.addEventListener("click", () => {

    const name = document.querySelector("#input-name").value;

    if (name.length != 0) {
        userName = name;
        socket.emit("newGame", { userName, modeGame });
    }

});

//Event when return pieces and idRoom 
socket.on("newGameCreate", (data) => {
    remakeDom(data);
    ownerConstruction();
});


// Join to some room with code

const joinBtn = document.querySelector("#joinToGame");

const jointToRoom = (idRoom) => {
    userName = document.querySelector("#userNameJoin").value;
    if (idRoom.length != 0 && userName.length != 0) {
        socket.emit("joinGame", {
            idRoom,
            userName,
            modeGame
        });
    }
}
joinBtn.addEventListener("click", () => {
    document.querySelector("[modal-backdrop]").remove();

    const idRoom = document.querySelector("#codigoGame").value;
    jointToRoom(idRoom);
});

// Joined succesfully
socket.on("connectedRoom", (data) => {
    remakeDom(data)
});

// catch errors
socket.on("error", (data) => {
    console.error(data);
});

function remakeDom({ idRoom }) {
    // Seleccionar el modal y ocultarlo
    const container = document.querySelector("#new-game-modal");
    const modal = new Modal(container);
    modal.hide();

    try{
        document.querySelector("[modal-backdrop]").remove();
    }catch(err){
        console.log(err);
    }
    // Re-make the DOM
    document.querySelector("#main-container").remove();
    // Contenedor de las fichas
    const handContainer = document.createElement('div');
    handContainer.classList.add("w-full", "flex", "justify-around", "my-8");
    handContainer.setAttribute("id", "pieces-container");

    // Nodo ocupado para referencia en donde insertar
    const nodeReference = document.getElementById("desition-modal");
    const parentNode = document.getElementsByTagName("body");

    parentNode[0].insertBefore(handContainer, nodeReference);
    const tableGame = document.createElement("main");
    tableGame.classList.add("table-game", "w-full", "h-auto", "min-h-[100px]", "bg-creme-black", "my-8", "flex", "flex-col", "items-center", "justify-center", "p-12");
    tableGame.setAttribute("id", "gameContainer");
    parentNode[0].insertBefore(tableGame, handContainer);

    const containerSpan = document.createElement("div");
    containerSpan.setAttribute("id", "containerSpan");
    containerSpan.classList.add("w-full", "text-center", "font-bold", "text-xl", "text-red-600", "my-4");
    containerSpan.innerText = "El id de tu juego es: ";

    const span = document.createElement("span");
    span.classList.add("text-black", "text-center", "w-full");
    span.textContent = idRoom;
    containerSpan.appendChild(span);
    parentNode[0].insertBefore(containerSpan, tableGame);
}

// Agregar boton para iniciar la partida, solo al dueño 
function ownerConstruction() {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", "btn-start");
    button.classList.add("block", "px-6", "py-2.5", "bg-green-500", "text-white", "font-medium", "text-xs", "leading-tight", "uppercase", "rounded", "shadow-md", "hover:bg-green-600", "hover:shadow-lg", "focus:bg-green-600", "focus:shadow-lg", "focus:outline-none", "focus:ring-0", "active:bg-green-700", "active:shadow-lg", "transition", "duration-150", "ease-in-out", "mx-auto", "my-4");
    button.textContent = "Iniciar Juego";
    document.querySelector("#containerSpan").appendChild(button);
    button.addEventListener("click", () => {
        socket.emit("startGame");
    });
}

// Recibir las piezas cuando se inicia el juego
socket.on("sendPieces", data => {
    // Eliminar boton de start game, en caso de que exista
    const button = document.querySelector("#btn-start");
    if (button) button.remove();

    // Si es el turno
    const spanActive = document.createElement("span");
    spanActive.classList.add("block", "text-center", "mx-auto", "bg-green-400", "text-green-800", "text-md", "font-medium", "px-2.5", "py-0.5", "rounded", "hidden");
    spanActive.textContent = "Es tu turno";
    spanActive.setAttribute("id", "turn-enable");

    // Si no es el turno
    const spanInactive = document.createElement("span");
    spanInactive.classList.add("block", "text-center", "mx-auto", "bg-red-400", "text-red-800", "text-md", "font-medium", "px-2.5", "py-0.5", "rounded");
    spanInactive.textContent = "No es tu turno";
    spanInactive.setAttribute("id", "turn-disable");

    // Span que muestra de quien es el turno actual
    const currentTurn = document.createElement("span");
    currentTurn.classList.add("inline-block", "text-center", "mx-auto", "bg-yellow-200", "text-red-800", "text-md", "font-medium", "px-2.5", "py-2.5", "rounded", "my-4");
    currentTurn.setAttribute("id", "current-turn");

    // Temporizador
    const temporizador = document.createElement("div");
    temporizador.textContent = "Tiempo restante:";
    temporizador.setAttribute("id", "temporizador");
    temporizador.classList.add("hidden", "block", "text-center", "mx-auto", "bg-orange-200", "text-red-800", "text-md", "font-medium", "px-2.5", "py-2.5", "rounded", "my-4");
    const tiempo = document.createElement("span");
    tiempo.setAttribute("id", "tiempo");
    tiempo.classList.add("text-black");
    temporizador.appendChild(tiempo);

    // Boton para saltar turno
    const skipButton = document.createElement("button");
    skipButton.classList.add("block", "text-center", "bg-blue-800", "text-white", "text-md", "font-medium", "px-2.5", "py-2.5", "rounded", "my-4");
    skipButton.setAttribute("id", "skip-turn");
    skipButton.textContent = "Saltar turno";
    skipButton.addEventListener("click", () => {
        if (isMyTurn) {
            desactivateTurn();
            socket.emit("skipTurn");
        }
    });

    // comer piezas
    const eatPieces = document.createElement("button");
    eatPieces.classList.add("block", "text-center", "bg-rose-600", "text-white", "text-md", "font-medium", "px-2.5", "py-2.5", "rounded", "my-4");
    eatPieces.setAttribute("id", "eat-piece");
    eatPieces.textContent = "Comer Piezas";
    eatPieces.addEventListener("click", () => {
        socket.emit("eat-piece");
    });

    // agregarlos al dom
    const parentNode = document.getElementsByTagName("body");
    parentNode[0].insertBefore(spanActive, document.querySelector("#pieces-container"));
    parentNode[0].insertBefore(spanInactive, document.querySelector("#pieces-container"));
    parentNode[0].insertBefore(temporizador, document.querySelector("#pieces-container"));
    parentNode[0].insertBefore(currentTurn, document.querySelector("#pieces-container"));
    parentNode[0].insertBefore(skipButton, document.querySelector("#pieces-container"));
    parentNode[0].insertBefore(eatPieces, document.querySelector("#pieces-container"));

    const piecesContainer = document.querySelector("#pieces-container");

    data.pieces.forEach(piece => {
        // Contenedor de la pieza
        const containPiece = document.createElement("div");
        containPiece.classList.add("piece");

        // Mitad de arriba
        const topHalf = document.createElement("div");
        topHalf.classList.add("top-half-column", `${piecesCode[piece.first - 1]}`);
        for (let i = 0; i < piece.first; ++i) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            topHalf.appendChild(bolita);
        }

        // Mitad de abajo
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
        containPiece.addEventListener("click", () => clickPiece(piece, containPiece));
    })
});

// change current turn
socket.on("changeCurrentTurn", (data) => {

    changeCurrentTurn(data.name);
    if (data.name == userName) {
        activeTurn(data.name);
    } else {
        desactivateTurn(data.name);
    }
});

function changeCurrentTurn(currentTurn) {
    console.log("llegue");
    const spanTurn = document.querySelector("#current-turn");
    spanTurn.innerText = `Es turno de: ${currentTurn}`;
}

// Activar el turno
function activeTurn(name) {
    console.log("hola");
    const turnActive = document.querySelector("#turn-enable");
    turnActive.classList.remove("hidden");
    const turnDisactive = document.querySelector("#turn-disable");
    turnDisactive.classList.add("hidden");
    isMyTurn = true;
    changeCurrentTurn(name);
    document.querySelector("#temporizador").classList.remove("hidden");
    tiempoRestante = 60;
    intervalo = setInterval(actualizarContador, 1000);
}

// desactivar turno
function desactivateTurn(name) {
    const turnDisactive = document.querySelector("#turn-disable");
    turnDisactive.classList.remove("hidden");
    const turnActive = document.querySelector("#turn-enable");
    turnActive.classList.add("hidden");
    isMyTurn = false;
    changeCurrentTurn(name);
    clearInterval(intervalo);
    document.querySelector("#temporizador").classList.add("hidden");
}

// Comprobar que la pieza sea valida
function comprobatePiece(first, second, side) {
    if (queueGame.length != 0) {
        if (isMyTurn && isValid({ first: first, second: second, side: side })) {
            socket.emit("pushPiece", { first: first, second: second, isMyTurn, id: socket.id, side: side });
            lastContainPiece.remove();
        }
    } else {
        socket.emit("pushPiece", { first: first, second: second, isMyTurn, id: socket.id });
        lastContainPiece.remove();
    }
}

socket.on("sendQueue", (data) => {
    queueGame = data.queueGame;
    construirCola(data);
});

const construirCola = (data) => {
    const contenedor = document.getElementById("gameContainer");
    const lastInformation = data.lastInformation;
    // Si la ultima pieza se agrego abajo
    if (lastInformation.side === "tail") {
        const piece = data.queueGame.at(-1);
        const first = typeof (piece.first) === "string" ? parseInt(piece.first.at(-1)) : piece.first;
        const second = typeof (piece.second) === "string" ? parseInt(piece.second.at(-1)) : piece.second;
        const firstHalf = document.createElement("div");
        const secondHalf = document.createElement("div");

        for (let i = 0; i < first; ++i) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            firstHalf.appendChild(bolita);
        }

        for (let i = 0; i < second; ++i) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            secondHalf.appendChild(bolita);
        }

        const rowCase = (first == second) ? '-row' : '-column';
        // si first esta ocupado
        (lastInformation.half === "first") ? secondHalf.classList.add(`bottom-half${rowCase}`, piecesCode[second - 1]) : secondHalf.classList.add(`top-half${rowCase}`, piecesCode[second - 1]);
        (lastInformation.half === "second") ? firstHalf.classList.add(`bottom-half${rowCase}`, piecesCode[first - 1]) : firstHalf.classList.add(`top-half${rowCase}`, piecesCode[first - 1]);

        const containPiece = document.createElement("div");
        if (lastInformation.half === "first") {
            containPiece.classList.add(`piece${rowCase}`);
            containPiece.appendChild(firstHalf);
            containPiece.appendChild(secondHalf);
        } else {
            containPiece.classList.add(`piece${rowCase}`);
            containPiece.appendChild(secondHalf);
            containPiece.appendChild(firstHalf);
        }

        contenedor.appendChild(containPiece);
    } else if (lastInformation.side === "head") {
        const lastElementHead = document.getElementById("gameContainer").childNodes[0];

        const piece = data.queueGame[0];
        const first = typeof (piece.first) === "string" ? parseInt(piece.first.at(-1)) : piece.first;
        const second = typeof (piece.second) === "string" ? parseInt(piece.second.at(-1)) : piece.second;
        const firstHalf = document.createElement("div");
        const secondHalf = document.createElement("div");

        for (let i = 0; i < first; ++i) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            firstHalf.appendChild(bolita);
        }

        for (let i = 0; i < second; ++i) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            secondHalf.appendChild(bolita);
        }

        const rowCase = (first == second) ? '-row' : '-column';
        // si first esta ocupado
        (lastInformation.half === "second") ? secondHalf.classList.add(`bottom-half${rowCase}`, piecesCode[second - 1]) : secondHalf.classList.add(`top-half${rowCase}`, piecesCode[second - 1]);
        (lastInformation.half === "first") ? firstHalf.classList.add(`bottom-half${rowCase}`, piecesCode[first - 1]) : firstHalf.classList.add(`top-half${rowCase}`, piecesCode[first - 1]);

        const containPiece = document.createElement("div");
        if (lastInformation.half === "second") {
            containPiece.classList.add(`piece${rowCase}`);
            containPiece.appendChild(firstHalf);
            containPiece.appendChild(secondHalf);
        } else {
            containPiece.classList.add(`piece${rowCase}`);
            containPiece.appendChild(secondHalf);
            containPiece.appendChild(firstHalf);
        }

        contenedor.insertBefore(containPiece, lastElementHead);
    } else if (lastInformation.side == "middle") {
        const firstHalf = document.createElement("div");
        let first = data.queueGame[0].first;
        first = parseInt(first);
        firstHalf.classList.add("top-half-row", piecesCode[first - 1]);
        for (let i = 0; i < first; i++) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            firstHalf.appendChild(bolita);
        }

        const secondHalf = document.createElement("div");
        let second = data.queueGame[0].first;
        second = parseInt(second);
        secondHalf.classList.add("bottom-half-row", piecesCode[second - 1]);
        for (let i = 0; i < second; i++) {
            const bolita = document.createElement("div");
            bolita.classList.add("bolita");
            secondHalf.appendChild(bolita);
        }
        const containPiece = document.createElement("div");
        containPiece.classList.add("piece-row");
        containPiece.appendChild(firstHalf);
        containPiece.appendChild(secondHalf);
        contenedor.appendChild(containPiece);
    }
}

const pushHead = document.getElementById("push-head");
const pushTail = document.getElementById("push-tail");

pushHead.addEventListener("click", () => {
    comprobatePiece(lastFirst, lastSecond, "head");
    toggleCustomModal();
    checkWin();
});

pushTail.addEventListener("click", () => {
    comprobatePiece(lastFirst, lastSecond, "tail");
    toggleCustomModal();
    checkWin();
});

socket.on("turn", ({ name }) => activeTurn(name));
socket.on("notTurn", ({ name }) => desactivateTurn(name));

// Comprobar que la pieza sea valida arriba o abajo
function isValid(piece) {
    if (queueGame.length != 0) {
        if (piece.side == "tail") {
            const tail = queueGame.at(-1);
            if (piece.first == tail.first || piece.first == tail.second || piece.second == tail.first || piece.second == tail.second) {
                return true;
            }
        } else if (piece.side == "head") {
            const head = queueGame[0];
            if (piece.first == head.first || piece.first == head.second || piece.second == head.first || piece.second == head.second) {
                return true;
            }
        }
        desactivateTurn();
        socket.emit("skipTurn");
        alert("Pieza invalida");
        return false;
    }
}
socket.on("eatedPiece", (piece) => {
    const piecesContainer = document.querySelector("#pieces-container");
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
    containPiece.addEventListener("click", () => clickPiece(piece, containPiece));
});
function checkWin() {
    const piecesContainer = document.querySelector("#pieces-container");
    console.log("comprobando");
    if (piecesContainer.childElementCount === 0) {
        const modal = document.querySelector("#wined-game");
        const smmodal = new Modal(modal);
        smmodal.show();
        socket.emit("winner", { name: userName });
    }
}
socket.on("winner", (data) => {

    document.addEventListener("click", () => {
        window.location.href = "../Html/index.html";
    });

    if (data.name != userName) {
        const textwiner = document.querySelector("#name-winer");
        textwiner.textContent = `${data.name} ha ganado!`;
        const modal = document.querySelector("#lose-game");
        const smmodal = new Modal(modal);
        smmodal.show();
    }
})

const toggleCustomModal = () => {
    const modal = document.querySelector("#desition-modal");
    const overlay = document.querySelector("#overlay")

    const zoomImage = document.querySelector("#zoom-image");
    zoomImage.innerHTML="";
    
    const copyLast = lastContainPiece.cloneNode(true);
    copyLast.classList.remove("piece");

    zoomImage.appendChild(copyLast);

    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}

// Cerra el modal si se presiona afuera
const overlay = document.querySelector("#overlay")
overlay.addEventListener("click", toggleCustomModal)

const clickPiece = (piece, containPiece) => {
    if (isMyTurn) {
        if (queueGame.length != 0) {
            lastFirst = piece.first;
            lastSecond = piece.second;
            lastContainPiece = containPiece;
            toggleCustomModal();
        } else {
            lastFirst = piece.first;
            lastSecond = piece.second;
            lastContainPiece = containPiece;
            comprobatePiece(piece.first, piece.second, "middle");
        }
    }
}

const seeInlineGames = document.querySelector("#see-inline-games");

seeInlineGames.addEventListener("click", () => {
    socket.emit("inLineGames", {
        modeGame
    });
});

socket.on("inLineGames", (data) => {
    const roomList = document.querySelector("#unordered-list-inline-games");
    roomList.innerHTML = "";
    let llaves = [...data];

    llaves.forEach(room => {
        // Crea el elemento LI
        const li = document.createElement("li");
        li.classList.add("flex", "justify-between", "snap-center", "items-center", "py-2", "flex-col", "md:flex-row", "border-b-[1px]", "border-gray-500", "p-4", "gap-8");

        // Crea el elemento DIV para el idRoom y ownerRoom
        const idOwnerDiv = document.createElement("div");
        idOwnerDiv.classList.add("flex", "items-center", "mr-4");

        const ownerDiv = document.createElement("div");
        ownerDiv.classList.add("flex", "items-center", "mr-4",);

        // Crea el elemento SPAN para el idRoom
        const idRoomSpan = document.createElement("span");
        idRoomSpan.textContent = `ID: ${room.idGame}`;
        idRoomSpan.classList.add("font-bold", "text-green-500", "mr-2",);

        // Crea el elemento SPAN para el ownerRoom
        const ownerRoomSpan = document.createElement("span");
        ownerRoomSpan.textContent = `Dueño: ${room.ownerName}`;
        ownerRoomSpan.classList.add("text-red-500");

        // Agrega los elementos SPAN al DIV idOwnerDiv
        idOwnerDiv.appendChild(idRoomSpan);
        ownerDiv.appendChild(ownerRoomSpan);

        // Crea el elemento SPAN para el numberPlayers
        const numberPlayersSpan = document.createElement("span");
        numberPlayersSpan.textContent = `Número de jugadores: ${room.numberPlayers}`;
        numberPlayersSpan.classList.add("text-yellow-500", "border-1", "border-black");

        // Crea el elemento BUTTON para unirse a la sala
        const joinButton = document.createElement("button");
        joinButton.textContent = "Unirse a esta sala";
        joinButton.classList.add("bg-blue-500", "text-white", "rounded", "px-4", "py-2");

        joinButton.addEventListener("click", () => {
            // Ocultar el modal actual 
            const firstTarget = document.querySelector("#list-inline-games");
            const firstTargetModal = new Modal(firstTarget);
            firstTargetModal.hide();
            // Mostrar el otro modal
            const inputCodeGame = document.querySelector("#codigoGame");
            inputCodeGame.value = room.idGame;
            inputCodeGame.disabled = "disabled";
            const target = document.querySelector("#authentication-modal");
            const modal = new Modal(target);
            modal.show();
        });
        // Agrega los elementos DIV, SPAN y BUTTON al LI
        li.appendChild(idOwnerDiv);
        li.appendChild(ownerDiv);
        li.appendChild(numberPlayersSpan);
        li.appendChild(joinButton);
        // Agrega el LI a la lista UL
        roomList.appendChild(li);

    });

})
socket.on("lessThanTwoPlayers", ({ message }) => alert(message));

const actualizarContador = () => {
    console.log('hola cada segundo');
    const contador = document.getElementById('tiempo');
    contador.innerText = tiempoRestante;
    tiempoRestante--;
    if (tiempoRestante === 0) {
        socket.emit("skipTurn");
    }
}