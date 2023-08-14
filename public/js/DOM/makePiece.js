import { fillPoints } from "./fillPoints.js";
import { fillImg } from "./fillImg.js";
import { onClickPiece } from "../eventsHandler/onClickPiece.js";

export const makePiece = ({ gameMode, orientation = "column", pointsTop = 0, pointsBottom = 0 }) => {
    // Contenedor de la pieza
    const containerPiece = document.createElement("div");
    containerPiece.classList.add(`piece-${orientation}`);

    // Mitad de arriba
    const topHalf = document.createElement("div");
    topHalf.classList.add(`top-half-${orientation}`);

    // Mitad de abajo
    const bottomHalf = document.createElement("div");
    bottomHalf.classList.add(`bottom-half-${orientation}`);

    if (gameMode === "tradicional") {
        fillPoints(topHalf, pointsTop);
        fillPoints(bottomHalf, pointsBottom);
    }else{
        fillImg(topHalf, pointsTop, gameMode);
        fillImg(bottomHalf, pointsBottom, gameMode);
    }
    containerPiece.appendChild(topHalf);
    containerPiece.appendChild(bottomHalf);

    containerPiece.addEventListener("click", () => 
        onClickPiece({pointsTop, pointsBottom, containerPiece})
    );
    return containerPiece;
};