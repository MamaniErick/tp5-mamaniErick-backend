const Publicacion = require("../models/publicacion.model");
const Empleado = require("../models/empleado.model");
const { Op } = require("sequelize"); // Importamos los operadores de Sequelize
const publicacionCtrl = {};

publicacionCtrl.createPublicacion = async (req, res) => {
  try {
    const data = req.body;
    if (data.empleado && data.empleado.id) {
      data.empleadoId = data.empleado.id;
    }
    await Publicacion.create(data);
    res.status(201).json({ status: "1", msg: "Publicación guardada." });
  } catch (error) {
    res.status(400).json({ status: "0", msg: "Error al guardar publicación.", error: error.message });
  }
};

publicacionCtrl.getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      include: [{ model: Empleado, as: "empleado" }] // Hace el JOIN automático
    });
    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({ status: "0", msg: "Error al obtener publicaciones.", error: error.message });
  }
};

publicacionCtrl.deletePublicacion = async (req, res) => {
  try {
    await Publicacion.destroy({ where: { id: req.params.id } });
    res.json({ status: "1", msg: "Publicación eliminada." });
  } catch (error) {
    res.status(400).json({ status: "0", msg: "Error al eliminar." });
  }
};

publicacionCtrl.editPublicacion = async (req, res) => {
  try {
    const data = req.body;
    if (data.empleado && data.empleado.id) {
      data.empleadoId = data.empleado.id;
    }
    await Publicacion.update(data, { where: { id: req.params.id } });
    res.json({ status: "1", msg: "Publicación modificada." });
  } catch (error) {
    res.status(400).json({ status: "0", msg: "Error al modificar." });
  }
};

publicacionCtrl.buscarPublicaciones = async (req, res) => {
  try {
    let donde = {};
    if (req.query.titulo) {
      donde.titulo = { [Op.iLike]: `%${req.query.titulo}%` };
    }
    if (req.query.vigente === "true") {
      donde.vigente = true;
    } else if (req.query.vigente === "false") {
      donde.vigente = false;
    }
    const resultados = await Publicacion.findAll({
      where: donde,
      include: [{ model: Empleado, as: "empleado" }]
    });
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ status: "0", msg: "Error en la búsqueda combinada.", error: error.message });
  }
};

module.exports = publicacionCtrl;
