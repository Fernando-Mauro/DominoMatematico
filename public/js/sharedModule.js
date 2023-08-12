const socket = io();
let userName;
let lastFirst, lastSecond;
let isMyTurn = false;
let queueGame = [];
let lastContainPiece = "";
const piecesCode = ["one-ball", "two-balls", "three-balls", "four-balls", "five-balls", "six-balls"];
// Leer del localstorage
let gameMode = "animales";
let tiempoRestante = 60; // tiempo en segundos
let intervalo;
let sumaPuntos = 0;

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