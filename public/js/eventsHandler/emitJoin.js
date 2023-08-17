import { hideModal } from "../DOM/hideModal.js";
import { getGameMode, getSocket, setUserName } from "../sharedModule.js";


export const emitJoin = () => {
    const socket = getSocket();
    
    hideModal(`authentication-modal`);
    
    const gameId = document.querySelector("#codigoGame").value;
    const gameMode = getGameMode();

    const userName = document.querySelector("#userNameJoin").value;
    setUserName(userName);

    if (gameId.length === 0 && userName.length <= 3) return;

    socket.emit("onJoiningGame", {
        gameId,
        userName,
        gameMode
    });
}