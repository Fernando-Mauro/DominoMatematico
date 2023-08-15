import { clearTimeLeft, getUserName, setMyTurn, setTimeLeft } from "../sharedModule.js";

const ring = document.querySelector("#ring");

export const changeCurrentTurn = ({name}) => {
    const turnActive = document.querySelector("#turn-enable");
    const turnDisactive = document.querySelector("#turn-disable");
    
    if (name === getUserName()) {
        ring.play();
        turnActive.classList.remove("hidden");
        turnDisactive.classList.add("hidden");
        setMyTurn(true);
        document.querySelector("#temporizador").classList.remove("hidden");
        setTimeLeft();
    } else {
        turnDisactive.classList.remove("hidden");
        turnActive.classList.add("hidden");
        setMyTurn(false);
        document.querySelector("#temporizador").classList.add("hidden");
        clearTimeLeft();
    }
    const spanTurn = document.querySelector("#current-turn");
    spanTurn.innerText = `Es turno de: ${name}`;
}