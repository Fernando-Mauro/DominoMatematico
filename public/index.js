
const levelSelector = document.querySelectorAll(".level-selector");
const removeAccents = (str) => {
    const strnew =  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    console.log(strnew.replace(/ /g, ""))
    return strnew.replace(/ /g, "");
}

levelSelector.forEach(el => {
    el.addEventListener("click", () => {
        const level = el.childNodes[1].innerText.split(" ")[1];
        remakeDom(level);
    })
});


const setGameMode = (gameMode) => {
    sessionStorage.setItem("gameMode", gameMode);
    let extension = undefined;
    if (gameMode === "princesas" || gameMode === "heroes" || gameMode === "ecuaciones") {
        extension = "png";
    } else {
        extension = "svg";
    }
    sessionStorage.setItem("extension", extension);
    let nested = "false";
    if (gameMode === "ecuaciones" || gameMode === "algebra" || gameMode === "notacioncientifica" || gameMode === "fracciones" || gameMode === "porcentajes" || gameMode === "multiplicaciondefracciones") {
        nested = "true";
    }
    sessionStorage.setItem("nested", nested);
}

const remakeDom = async (level) => {
    const levelLower = level.toLowerCase();
    try {
        const response = await fetch("./levels.json");
        const data = await response.json();

        if (!data[0][levelLower]) return 0;

        const containerCards = document.querySelector(".container-cards");
        document.querySelectorAll(".card").forEach(el => el.remove());

        let stringComplete = ""
        data[0][levelLower].forEach(el => {
            // containerCards.appendChild(el);
            stringComplete += el;
        });
        containerCards.innerHTML = stringComplete;

        const anchors = document.querySelectorAll(".anchor");

        anchors.forEach((el) => {
            const innerText = removeAccents(el.innerText.toLowerCase());
            el.addEventListener("click", (event) => {
                setGameMode(innerText);
            });
        })
        document.querySelector(".container-cards").click();
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    remakeDom("preescolar");
    // document.querySelectorAll(".level-selector").forEach(el => {
    //     el.click();
    // })
});