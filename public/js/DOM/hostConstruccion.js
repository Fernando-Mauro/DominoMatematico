import { getSocket } from "../sharedModule.js";

const socket = getSocket();

export const ownerConstruction = () => {
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