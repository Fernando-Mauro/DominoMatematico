import { getGameMode, setQueueGame } from "../sharedModule.js";
import { makePiece } from "./makePiece.js";

export const buildQueue = ({ last }) => {
    const containerQueue = document.getElementById("gameContainer");
    const { newFirst, newSecond, orientation, side } = last;
    setQueueGame({
        first: newFirst,
        second: newSecond
    });
    const gameMode = getGameMode();
    const piece = makePiece({
        gameMode,
        orientation,
        pointsTop: newFirst,
        pointsBottom: newSecond,
    });
}