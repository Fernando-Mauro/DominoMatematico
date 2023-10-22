document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper('.swiper', {

        direction: 'horizontal',
        loop: true,
        effect: "fade",

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
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
})