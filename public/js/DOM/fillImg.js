import { getExtension, isNestedGame } from "../sharedModule.js";

export const fillImg = (half, points, gameMode, secondPoints) => {
    const nested = isNestedGame();
    const extension = getExtension();

    let url = "";
    if(nested){
        url = `/assets/${gameMode}/${points}/${secondPoints}.${extension}`;
    }else{
        url = `/assets/${gameMode}/${points}.${extension}`;
    }
    console.log(url);
    half.style.backgroundImage = "url(" + url + ")";
}