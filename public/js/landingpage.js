document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("bee-animation");
    const panel = canvas.getContext("2d");

    const beeImage = new Image();
    beeImage.src = "../assets/objects/bee.png"

    const amplitudeX = 100;    // Amplitud de la oscilación horizontal
    const frequencyX = 0.05;    // Frecuencia de la oscilación horizontal
    const amplitudeY = 50;    // Amplitud de la oscilación vertical
    const frequencyY = 0.03;    // Frecuencia de la oscilación vertical
    const numPoints = 5000; // Número de puntos en la trayectoria

    const animationSpeed = 0.05; // Velocidad de la animación (ajusta según sea necesario)
    let currentIndex = 0;

    function simulateBeeFlight(amplitudeX, frequencyX, amplitudeY, frequencyY, numPoints, canvasHeight) {
        const points = [];
        for (let i = 0; i <= canvas.width; i++) {
            const x = (i * numPoints) * Math.pow(canvas.width,2);
            const y = 10 * Math.pow((Math.sin(x) * (-1)), 2);
            points.push({ x, y });
            console.log({x,y});
        }
        return points;
    }

    const resizeCanvas = () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawBee = (coordX = 0, coordY = 0) => {
        panel.clearRect(0, 0, canvas.width, canvas.height);
        const desiredWidth = 100;
        const desiredHeight = 100;
        panel.drawImage(beeImage, 0, 0, beeImage.width, beeImage.height, coordX, coordY, desiredWidth, desiredHeight);
    };

    beeImage.addEventListener("load", () => {
        drawBee();
    });

    const canvasHeight = canvas.height;
    const beeFlightPath = simulateBeeFlight(amplitudeX, frequencyX, amplitudeY, frequencyY, numPoints, canvasHeight);

    const animate = () => {
        if (currentIndex < beeFlightPath.length - 1) {
            const currentPoint = beeFlightPath[currentIndex];
            const nextPoint = beeFlightPath[currentIndex + 1];

            const intermediateX = (currentPoint.x + (nextPoint.x - currentPoint.x) * animationSpeed);
            const intermediateY = (currentPoint.y + (nextPoint.y - currentPoint.y) * animationSpeed);

            drawBee(intermediateX, intermediateY);
            currentIndex += 1;
            requestAnimationFrame(animate);
        } else {
            currentIndex = 0;
            requestAnimationFrame(animate);
        }
    };

    animate();
    const swiper = new Swiper('.swiper', {

        direction: 'horizontal',
        loop: true,
        effect: "fade",

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay:{
            delay: 2000
        }
    });
    swiper.on("slideChangeTransitionStart", () => {
        // Obtener todos los slides
        const slides = swiper.slides;

        // Iterar a través de los slides
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];

            // Verificar si el slide es el activo
            if (slide.classList.contains('swiper-slide-active')) {
                // Slide activo: establecer la opacidad a 1
                slide.style.opacity = 1;
            } else {
                // Slide inactivo: establecer la opacidad a 0 (o el valor deseado)
                slide.style.opacity = 0;
            }
        }
    });
    console.log(swiper);
})