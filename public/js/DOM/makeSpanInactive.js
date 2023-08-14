export const makeSpanInactive = () => {
    const spanInactive = document.createElement("span");
    spanInactive.classList.add("block", "text-center", "mx-auto", "bg-red-400", "text-red-800", "text-md", "font-medium", "px-2.5", "py-0.5", "rounded");
    spanInactive.textContent = "No es tu turno";
    spanInactive.setAttribute("id", "turn-disable");
    return spanInactive;
}