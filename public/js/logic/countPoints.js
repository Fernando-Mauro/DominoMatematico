import { getPoints, setPoints } from "../sharedModule.js";

export const countPoints = ({pieces}) => {
    let sumaPuntos = getPoints(); 
    pieces.forEach(piece => {
        sumaPuntos += piece.first;
        sumaPuntos += piece.second;
    });
    setPoints({value : sumaPuntos});
    const puntos = document.getElementById("show-points");
    puntos.innerHTML = `Puntos: ${sumaPuntos}`;
}