import { getTimeLeft } from "../sharedModule.js";

export const updateCounter = () => {
    let timeLeft = getTimeLeft();
    const contador = document.getElementById('tiempo');
    contador.innerText = timeLeft;
    timeLeft--;
    if (timeLeft === 0) {
        socket.emit("skipTurn");
    }
}