import { getExtension, isNestedGame } from "../sharedModule.js";

export const fillImg = (half, points, gameMode) => {
    const nested = isNestedGame();
    const extension = getExtension();
    let url = "";
    if(nested){
        url = `/assets/${gameMode}/${points}/${points}.${extension}`;
    }else{
        url = `/assets/${gameMode}/${points}.${extension}`;
    }

    half.style.backgroundImage = `url(${url})`;
}