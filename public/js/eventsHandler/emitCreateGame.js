import { getGameMode, setUserName } from "../sharedModule.js";

export const emitCreateGame = ({socket}) => {

    const userName = document.querySelector("#input-name").value;  
    const gameMode = getGameMode();
    
    if (userName.length <= 3) return;
    
    setUserName(userName);  
    
    socket.emit("onCreateNewGame", {
        userName,
        gameMode
    });
}