import { Player } from "../beta/jugador.mjs"

const socket = io();
let player;
window.player = player;
// Create a new game
const newGameButton = document.querySelector("#new-game-button");

newGameButton.addEventListener("click", () => {
    const name = document.querySelector("#input-name").value;
    if (name.length != 0) {
        player = new Player(name,socket, "beta", "../src/js")
        window.player = player;
        console.log(player);
    }
});
