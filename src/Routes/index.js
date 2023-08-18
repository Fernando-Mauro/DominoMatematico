const { Router } = require("express");
const router = Router();

// importar
const flowbite = require("./flowbite");
const swiper = require("./swiper.js")
const swipercss = require("./swipercss.js")


// Rutas especificas :D
router.use("/flowbite.js", flowbite);

router.use("/swiper.js", swiper)

router.use("/swiper.css", swipercss)

module.exports = router;