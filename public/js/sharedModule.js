const socket = io();
let userName;
let lastFirst, lastSecond;
let isMyTurn = false;
let queueGame = [];
let lastContainPiece = "";
const piecesCode = ["one-ball", "two-balls", "three-balls", "four-balls", "five-balls", "six-balls"];
// Leer del localstorage
let gameMode = sessionStorage.getItem("gameMode");

let tiempoRestante = 60;
let intervalo;
let totalPoints = 0;

export const getSocket = () => {
    return socket;
}
export const getUserName = () => {
    return userName;
}

export const setUserName = (newUserName) => {
    userName = newUserName;
}

export const getGameMode = () => {
    return gameMode;
}

export const setGameMode = (newGameMode) => {
    gameMode = newGameMode;
}

export const getPiecesCode = () => {
    return piecesCode;
}

export const getQueueGame = () => {
    return queueGame;
}

export const setQueueGame = ({first, second}) => {
    queueGame = [first, second];
}

export const setMyTurn = (val) => {
    isMyTurn = val;
}
export const getMyTurn = () => {
    return isMyTurn;
}

export const setLastClicked = ({first, second, containerPiece}) => {
    lastFirst = first;
    lastSecond = second;
    lastContainPiece = containerPiece;
};

export const getLastClicked = () => {
    return {
        first: lastFirst,
        second: lastSecond,
        container: lastContainPiece
    }
}

export const setTimeLeft = () => {
    tiempoRestante = 60;
    intervalo = setInterval(updateCounter, 1000);
}

const updateCounter = () => {
    const contador = document.getElementById('tiempo');
    contador.innerText = tiempoRestante;
    tiempoRestante--;
    if (tiempoRestante === 0) {
        socket.emit("skipTurn");
    }
}

export const clearTimeLeft = () => {
    clearInterval(intervalo);
}
export const getTimeLeft = () => {
    return tiempoRestante;
}

export const getPoints = () => {
    return totalPoints;
}

export const setPoints = ({value}) => {
    totalPoints = value;
}

export const isNestedGame = () => {
    return sessionStorage.getItem("nested") === "true";
}
export const getExtension = () => {
    return sessionStorage.getItem("extension");
}