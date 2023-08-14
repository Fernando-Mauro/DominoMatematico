export const makeCurrentSpan = () => {
    // Span que muestra de quien es el turno actual
    const currentTurn = document.createElement("span");
    currentTurn.classList.add("inline-block", "text-center", "mx-auto", "bg-yellow-200", "text-red-800", "text-md", "font-medium", "px-2.5", "py-2.5", "rounded", "my-4");
    currentTurn.setAttribute("id", "current-turn");
    return currentTurn;
}