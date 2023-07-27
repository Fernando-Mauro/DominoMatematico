const { Router } = require("express");
const router = Router();

// importar
const homeRoutes = require("./home");
const flowbite = require("./flowbite");

// Rutas especificas :D
router.use("/",homeRoutes);
router.use("/flowbite.js", flowbite);

module.exports = router;