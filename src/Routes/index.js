const { Router } = require("express");
const router = Router();

// importar
const flowbite = require("./flowbite");

// Rutas especificas :D
router.use("/flowbite.js", flowbite);

// router.use("/assets/**/**/*.svg", (req,res) => {
//     console.log(req.originalUrl);
//     res.sendFile(req.originalUrl)
// })

module.exports = router;