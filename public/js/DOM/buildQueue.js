import { getGameMode, setQueueGame , getLastClicked, getQueueGame} from "../sharedModule.js";
import { makePiece } from "./makePiece.js";

export const buildQueue = ({ halves, orientation, side, match , queue}) => {
    const containerQueue = document.getElementById("gameContainer");
    const reference = document.getElementById("gameContainer").childNodes[0];
     
    let first, second;
    if(side === "middle"){
        second = halves[0];
        first = halves[1];

    }else if(side === "head"){
        second = halves[match];
        if(match === 1)
            first = halves[0]
        else   
            first = halves[1]
    
        }else if(side === "tail"){
        first = halves[match]
        if(match === 1)
            second = halves[0]
        else    
            second = halves[1]
    }

    const gameMode = getGameMode();
    const piece = makePiece({
        gameMode,
        orientation,
        first,
        second
    });

    setQueueGame({
        first: queue[0], 
        second: queue[1]
    });
    
    if(side === "head"){
        containerQueue.insertBefore(piece, reference);
    }else{
        containerQueue.appendChild(piece);
    }
}