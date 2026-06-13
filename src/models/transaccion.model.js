const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Transaccion = sequelize.define(
  "Transaccion",
  {
    idiomaOrigen: { type: DataTypes.STRING, allowNull: false },
    textoOrigen: { type: DataTypes.TEXT, allowNull: false }, // Usamos TEXT por si mandan parrafos largos
    idiomaDestino: { type: DataTypes.STRING, allowNull: false },
    textoDestino: { type: DataTypes.TEXT, allowNull: false },
    emailCliente: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } }, // Valida formato email
  },
  {
    tableName: "transacciones",
    timestamps: true, 
  }
);

module.exports = Transaccion;
