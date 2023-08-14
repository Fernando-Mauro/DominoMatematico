import { getLastClicked } from "../sharedModule.js";

export const toggleCustomModal = () => {
    const { container } = getLastClicked();

    const modal = document.querySelector("#desition-modal");
    const overlay = document.querySelector("#overlay")

    const zoomImage = document.querySelector("#zoom-image");
    zoomImage.innerHTML = "";

    const copyLast = container.cloneNode(true);
    copyLast.classList.remove("piece");

    zoomImage.appendChild(copyLast);
    console.log('====================================');
    console.log('llegue');
    console.log('====================================');
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}