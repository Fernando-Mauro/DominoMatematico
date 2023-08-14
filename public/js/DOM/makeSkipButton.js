import { getMyTurn, getSocket } from "../sharedModule.js";

const socket = getSocket();

export const makeSkipButton = () => {
    // Boton para saltar turno
    const skipButton = document.createElement("button");
    skipButton.classList.add("block", "text-center", "bg-blue-800", "text-white", "text-md", "font-medium", "px-2.5", "py-2.5", "rounded", "my-4");
    skipButton.setAttribute("id", "skip-turn");
    skipButton.textContent = "Saltar turno";
    skipButton.addEventListener("click", () => {
        if (getMyTurn()) {
            socket.emit("skipTurn");
        }
    });
    return skipButton;
}