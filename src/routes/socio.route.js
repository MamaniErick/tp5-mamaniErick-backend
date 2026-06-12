const socioCtrl = require("../controllers/socio.controller");
const express = require("express");
const router = express.Router();

router.get("/", socioCtrl.getSocios); // todos
router.get("/activos", socioCtrl.getSociosActivos); //solo activos (va ANTES de /:id)
router.get("/:id", socioCtrl.getSocio); // uno por ID
router.post("/", socioCtrl.createSocio);
router.put("/:id", socioCtrl.editSocio);
router.delete("/:id", socioCtrl.deleteSocio);

module.exports = router;
