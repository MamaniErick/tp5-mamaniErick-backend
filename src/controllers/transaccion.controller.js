const Transaccion = require("../models/transaccion.model");
const transaccionCtrl = {};

transaccionCtrl.createTransaccion = async (req, res) => {
  try {
    await Transaccion.create(req.body);
    res.status(201).json({ status: "1", msg: "Transacción registrada en el LOG." });
  } catch (error) {
    res.status(400).json({ status: "0", msg: "Error al registrar la transacción.", error: error.message });
  }
};

transaccionCtrl.getTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll();
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ status: "0", msg: "Error al obtener las transacciones." });
  }
};

transaccionCtrl.getHistoricoPorEmail = async (req, res) => {
  try {
    const criteria = {};
    
    if (req.params.email) {
      criteria.emailCliente = req.params.email;
    }

    const transacciones = await Transaccion.findAll({ where: criteria });
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ status: "0", msg: "Error al recuperar el historial del cliente." });
  }
};

transaccionCtrl.getPorIdiomas = async (req, res) => {
  try {
    const criteria = {};

    if (req.query.origen) {
      criteria.idiomaOrigen = req.query.origen;
    }

    if (req.query.destino) {
      criteria.idiomaDestino = req.query.destino;
    }
    
    const transacciones = await Transaccion.findAll({ where: criteria });
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ status: "0", msg: "Error al filtrar por idiomas.", error: error.message });
  }
};

module.exports = transaccionCtrl;
