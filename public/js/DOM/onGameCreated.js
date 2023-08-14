import { hideModal } from "./hideModal.js";

export const onGameCreated = ({gameId}) => {
    hideModal(`new-game-modal`);

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
    span.textContent = gameId;
    containerSpan.appendChild(span);
    parentNode[0].insertBefore(containerSpan, tableGame);
}