export const makeTimer = () => {
    // Temporizador
    const temporizador = document.createElement("div");
    temporizador.textContent = "Tiempo restante:";
    temporizador.setAttribute("id", "temporizador");
    temporizador.classList.add("hidden", "block", "text-center", "mx-auto", "bg-orange-200", "text-red-800", "text-md", "font-medium", "px-2.5", "py-2.5", "rounded", "my-4");
    const tiempo = document.createElement("span");
    tiempo.setAttribute("id", "tiempo");
    tiempo.classList.add("text-black");
    temporizador.appendChild(tiempo);
    return temporizador;
}