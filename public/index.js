const anchors = document.querySelectorAll(".anchor");

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

anchors.forEach((el) => {
    const innerText  = removeAccents(el.innerText.toLowerCase());
    el.addEventListener("click", () => {
        setGameMode(innerText);
    })
})

const setGameMode = (gameMode) => {
    sessionStorage.setItem("gameMode", gameMode);
    let extension = undefined;
    if(gameMode === "princesas" || gameMode === "heroes" || gameMode === "ecuaciones"){
        extension = "png";
    }else{
        extension = "svg";
    }
    sessionStorage.setItem("extension", extension);
    let nested = "false";
    if(gameMode === "ecuaciones" || gameMode === "algebra"){
        nested = "true";
    }
    sessionStorage.setItem("nested", nested);
}