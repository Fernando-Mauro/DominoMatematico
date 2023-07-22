// Obtener el contexto del canvas
const canvas = document.getElementById('domino-canvas');
const ctx = canvas.getContext('2d');

// Función para cargar una imagen
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// Función para dibujar una ficha de dominó en el canvas
async function drawDomino(x, y, imageSrc) {
    // Cargar la imagen
    const image = await loadImage(imageSrc);

    // Dibujar la imagen en el canvas
    ctx.drawImage(image, x, y, 80, 160);
}

// Ejemplo de cómo dibujar una cola de fichas con imágenes
const queue = [
    { imageSrc: '../assets/animales/conejo.png' },
    { imageSrc: '../assets/animales/gato.png' },
    { imageSrc: '../assets/animales/oso.png' }
];

// Posición inicial para dibujar las fichas
let x = 10;
let y = 10;

// Dibujar cada ficha en la cola
queue.forEach(ficha => {
    drawDomino(x, y, ficha.imageSrc);
    x += 50; // Avanzar la posición en el eje x para la siguiente ficha
});
