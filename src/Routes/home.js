const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.send('Pagina Home');
});

module.exports = router;