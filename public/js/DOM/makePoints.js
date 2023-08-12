export const makePoints = () => {
    // mostrar puntos
    const puntos = document.createElement("button");
    puntos.classList.add("block", "text-center", "bg-orange-600", "text-white", "text-md", "font-medium", "px-2.5", "py-2.5", "rounded", "my-4");
    puntos.setAttribute("id", "show-points");
    puntos.textContent = "Puntos: ";
    return puntos;
}