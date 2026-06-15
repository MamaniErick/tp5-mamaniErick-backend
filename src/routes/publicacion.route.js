const express = require("express");
const router = express.Router();
const publicacionCtrl = require("../controllers/publicacion.controller");

router.post("/", publicacionCtrl.createPublicacion);
router.get("/", publicacionCtrl.getPublicaciones);
router.get("/buscar", publicacionCtrl.buscarPublicaciones);
router.put("/:id", publicacionCtrl.editPublicacion);
router.delete("/:id", publicacionCtrl.deletePublicacion);

module.exports = router;
