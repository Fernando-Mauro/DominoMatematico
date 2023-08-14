import { getPiecesCode } from "../sharedModule.js";

const piecesCode = getPiecesCode();

export const fillPoints = (half, points) => {
    half.classList.add(`${piecesCode[points - 1]}`)
    for (let i = 0; i < points; ++i) {
        const bolita = document.createElement("div");
        bolita.classList.add("bolita");
        half.appendChild(bolita);
    }
}