import { makeEatBtn } from "./makeEatBtn.js";
import { makeCurrentSpan } from "./makeCurrentSpan.js";
import { makePoints } from "./makePoints.js";
import { makeSkipButton } from "./makeSkipButton.js";
import { makeSpanActive } from "./makeSpanActive.js";
import { makeSpanInactive } from "./makeSpanInactive.js";
import { makeTimer } from "./makeTimer.js";
import { makePiece } from "./makePiece.js";
import { countPoints } from "../logic/countPoints.js";
import { changeCurrentTurn } from "../logic/changeCurrentTurn.js";

export const onSendedPieces = ({
    pieces,
    gameMode,
    currentTurn
}) => {

    // Eliminar boton de start game, en caso de que exista
    const button = document.querySelector("#btn-start");
    if (button) button.remove();
    const piecesContainer = document.querySelector("#pieces-container");

    // agregarlos al dom
    const parentNode = document.getElementsByTagName("body");
    parentNode[0].insertBefore(makeSpanActive(), piecesContainer);
    parentNode[0].insertBefore(makeSpanInactive(), piecesContainer);
    parentNode[0].insertBefore(makeTimer(), piecesContainer);
    parentNode[0].insertBefore(makeCurrentSpan(), piecesContainer);
    parentNode[0].insertBefore(makeSkipButton(), piecesContainer);
    parentNode[0].insertBefore(makePoints(), piecesContainer);
    parentNode[0].insertBefore(makeEatBtn(), piecesContainer);

    pieces.forEach(piece => {
        piecesContainer.appendChild(
            makePiece({
                gameMode,
                pointsTop: piece.first,
                pointsBottom: piece.second
            }));
    });
    changeCurrentTurn(currentTurn);
    countPoints({ pieces });
}