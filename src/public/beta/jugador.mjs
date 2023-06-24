export class Player {
    constructor(name, socket, mode, path) {
        this.name = name;
        this.socket = socket;
        this.mode = mode;
        this.path = path;
        this.eventsListeners();
        this.createNewGame();
    }

    createNewGame() {
        this.socket.emit("newGame", {
            userName: this.name,
            modeGame: this.mode
        });
    }

    eventsListeners() {
        this.socket.on("newGameCreate", (data) => {
            this.remakeDOM(data);
            this.ownerConstruction();
        });

        this.socket.on("sendPieces", this.sendedPieces)
    }

    ownerConstruction(){
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("id", "btn-start");
        button.classList.add("block", "px-6", "py-2.5", "bg-green-500", "text-white", "font-medium", "text-xs", "leading-tight", "uppercase", "rounded", "shadow-md", "hover:bg-green-600", "hover:shadow-lg", "focus:bg-green-600", "focus:shadow-lg", "focus:outline-none", "focus:ring-0", "active:bg-green-700", "active:shadow-lg", "transition", "duration-150", "ease-in-out", "mx-auto", "my-4");
        button.textContent = "Iniciar Juego";
        document.querySelector("#containerSpan").appendChild(button);
        button.addEventListener("click", () => {
            this.socket.emit("startGame");
        });
    }

    remakeDOM({ idRoom }) {
        // Seleccionar el modal y ocultarlo
        const container = document.querySelector("#new-game-modal");
        const modal = new Modal(container);
        modal.hide();
        document.querySelector("[modal-backdrop]").remove();

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

    sendedPieces(data){
        
    }
}