const Socio = require("../models/socio.model");
const socioCtrl = {};

// GET todos los socios
socioCtrl.getSocios = async (req, res) => {
  try {
    const socios = await Socio.findAll();
    res.json(socios);
  } catch (error) {
    res.status(500).json({ status: "0", msg: "Error al obtener los socios." });
  }
};

// GET socios ACTIVOS solamente
socioCtrl.getSociosActivos = async (req, res) => {
  try {
    const socios = await Socio.findAll({ where: { activo: true } });
    res.json(socios);
  } catch (error) {
    res
      .status(500)
      .json({ status: "0", msg: "Error al obtener los socios activos." });
  }
};

// GET un socio por ID
socioCtrl.getSocio = async (req, res) => {
  try {
    const socio = await Socio.findByPk(req.params.id);
    if (!socio) {
      return res.status(404).json({ status: "0", msg: "Socio no encontrado." });
    }
    res.json(socio);
  } catch (error) {
    res.status(500).json({ status: "0", msg: "Error al obtener el socio." });
  }
};

// POST crear un socio
socioCtrl.createSocio = async (req, res) => {
  try {
    await Socio.create(req.body);
    res.json({ status: "1", msg: "Socio guardado." });
  } catch (error) {
    res.status(400).json({ status: "0", msg: "Error procesando operacion." });
  }
};

// PUT modificar un socio
socioCtrl.editSocio = async (req, res) => {
  try {
    await Socio.update(req.body, {
      where: { id: req.params.id }, // usa el id de la URL, más seguro
    });
    res.json({ status: "1", msg: "Socio actualizado." });
  } catch (error) {
    res
      .status(400)
      .json({ status: "0", msg: "Error procesando la operacion." });
  }
};

// DELETE eliminar un socio
socioCtrl.deleteSocio = async (req, res) => {
  try {
    await Socio.destroy({
      where: { id: req.params.id },
    });
    res.json({ status: "1", msg: "Socio eliminado." });
  } catch (error) {
    res
      .status(400)
      .json({ status: "0", msg: "Error procesando la operacion." });
  }
};

module.exports = socioCtrl;
