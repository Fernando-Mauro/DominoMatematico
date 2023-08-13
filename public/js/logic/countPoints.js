export const countPoints = ({pieces}) => {
    let sumaPuntos; 
    pieces.forEach(piece => {
        sumaPuntos += piece.first;
        sumaPuntos += piece.second;
    });
    const puntos = document.getElementById("show-points");
    puntos.innerHTML = `Puntos: ${sumaPuntos}`;
}