import { getPoints, setPoints } from "../sharedModule.js";

export const updatePoints = ({ first, second }) => {
    let sumaPuntos = getPoints();
    sumaPuntos -= (first + second);
    setPoints({value : sumaPuntos})
    const puntos = document.getElementById("show-points");
    puntos.innerHTML = `Puntos: ${sumaPuntos}`;
};