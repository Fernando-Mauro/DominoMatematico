const { Router } = require("express");
const router = Router();

// importar
const flowbite = require("./flowbite");

// Rutas especificas :D
router.use("/flowbite.js", flowbite);

module.exports = router;