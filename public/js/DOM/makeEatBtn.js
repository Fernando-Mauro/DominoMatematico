import { getSocket } from "../sharedModule.js";

const socket = getSocket();

export const makeEatBtn = () => {
    // comer piezas
    const eatPieces = document.createElement("button");
    eatPieces.classList.add("block", "text-center", "bg-rose-600", "text-white", "text-md", "font-medium", "px-2.5", "py-2.5", "rounded", "my-4");
    eatPieces.setAttribute("id", "eat-piece");
    eatPieces.textContent = "Comer Piezas";
    eatPieces.addEventListener("click", () => {
        socket.emit("eat-piece");
    });

    return eatPieces;
}