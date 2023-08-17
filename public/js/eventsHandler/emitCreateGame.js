import { getGameMode, setUserName } from "../sharedModule.js";

export const emitCreateGame = ({socket, input}) => {
    console.log(input);
    const userName = document.querySelector(input).value;  
    const gameMode = getGameMode();
    
    if (userName.length <= 3) return;
    
    setUserName(userName);  
    
    socket.emit("onCreateNewGame", {
        userName,
        gameMode
    });
}