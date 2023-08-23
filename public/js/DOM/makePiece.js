import { fillPoints } from "./fillPoints.js";
import { fillImg } from "./fillImg.js";
import { onClickPiece } from "../eventsHandler/onClickPiece.js";

export const makePiece = ({ gameMode, orientation = "column", first = 0, second = 0 }) => {
    // Contenedor de la pieza
    const containerPiece = document.createElement("div");
    containerPiece.classList.add(`piece-${orientation}`);

    // Mitad de arriba
    const topHalf = document.createElement("div");
    topHalf.classList.add(`top-half-${orientation}`);

    // Mitad de abajo
    const bottomHalf = document.createElement("div");
    bottomHalf.classList.add(`bottom-half-${orientation}`);
    // console.log(gameMode, orientation, first,second);
    if (gameMode === "tradicional") {
        fillPoints(topHalf, first);
        fillPoints(bottomHalf, second);
    }else{
        fillImg(topHalf, first, gameMode, second);
        fillImg(bottomHalf, second, gameMode, first);
    }
    containerPiece.appendChild(topHalf);
    containerPiece.appendChild(bottomHalf);

    containerPiece.addEventListener("click", () => 
        onClickPiece({first, second, containerPiece})
    );
    return containerPiece;
};
