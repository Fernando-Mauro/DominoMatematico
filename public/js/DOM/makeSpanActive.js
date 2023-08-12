export const makeSpanActive = () => {
    const spanActive = document.createElement("span");
    spanActive.classList.add("block", "text-center", "mx-auto", "bg-green-400", "text-green-800", "text-md", "font-medium", "px-2.5", "py-0.5", "rounded", "hidden");
    spanActive.textContent = "Es tu turno";
    spanActive.setAttribute("id", "turn-enable");
    return spanActive;
}
