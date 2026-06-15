const socioCtrl = require("../controllers/socio.controller");
const express = require("express");
const router = express.Router();

router.get("/", socioCtrl.getSocios); 
router.get("/activos", socioCtrl.getSociosActivos); 
router.get("/:id", socioCtrl.getSocio); 
router.post("/", socioCtrl.createSocio);
router.put("/:id", socioCtrl.editSocio);
router.delete("/:id", socioCtrl.deleteSocio);

module.exports = router;
