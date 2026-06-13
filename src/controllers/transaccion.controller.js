const Transaccion = require("../models/transaccion.model");
const transaccionCtrl = {};

// 1. Dar de alta una Transaccion(POST)
transaccionCtrl.createTransaccion = async (req, res) => {
  try {
    await Transaccion.create(req.body);
    res.status(201).json({ status: "1", msg: "Transacción registrada en el LOG." });
  } catch (error) {
    res.status(400).json({ status: "0", msg: "Error al registrar la transacción.", error: error.message });
  }
};

// 2. Recuperar TODAS las Transacciones Registradas(GET)
transaccionCtrl.getTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll();
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ status: "0", msg: "Error al obtener las transacciones." });
  }
};

// 3. Recuperar el histórico de transacciones de un
// determinado cliente (GET), utilizar email como clave
transaccionCtrl.getHistoricoPorEmail = async (req, res) => {
  try {
    const { email } = req.params; // Lo tomamos desde la URL /historico/:email
    const transacciones = await Transaccion.findAll({
      where: { emailCliente: email }
    });
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ status: "0", msg: "Error al recuperar el historial del cliente." });
  }
};

// 4. Recuperar TODAS las Transacciones que tengan como
//origen y destino los idiomas redibidos como parámetro
//(GET). Utilice el concepto de PARAMS.
transaccionCtrl.getPorIdiomas = async (req, res) => {
  try {
    const { origen, destino } = req.params; 
    
    const transacciones = await Transaccion.findAll({
      where: {
        idiomaOrigen: origen,
        idiomaDestino: destino
      }
    });
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ status: "0", msg: "Error al filtrar por idiomas." });
  }
};

module.exports = transaccionCtrl;
