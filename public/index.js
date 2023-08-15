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
}