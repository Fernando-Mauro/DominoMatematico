const { Router } = require("express");
const path = require("path");

const router = Router();

router.get("/",(req, res) => {    
    const ruta = path.join(__dirname, "../../node_modules/swiper/swiper.css");
    res.sendFile(ruta);
});

module.exports = router;