export const onWinner = ({ name }) => {
    document.addEventListener("click", () => {
        window.location.href = "./index.html";
    });

    if (name != userName) {
        const textwiner = document.querySelector("#name-winer");
        textwiner.textContent = `${name} ha ganado!`;
        const modal = document.querySelector("#lose-game");
        const smmodal = new Modal(modal);
        smmodal.show();
    }
}