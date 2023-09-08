import { getUserName } from "../sharedModule.js";

export const onWinner = ({ name }) => {
    const userName = getUserName();
    
    document.addEventListener("click", () => {
        window.location.reload();
    });

    if (name != userName) {
        const textwiner = document.querySelector("#name-winer");
        textwiner.textContent = `${name} ha ganado!`;
        const modal = document.querySelector("#lose-game");
        const smmodal = new Modal(modal);
        smmodal.show();
    }
}