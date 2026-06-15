const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Empleado = require("./empleado.model");

const Publicacion = sequelize.define(
  "Publicacion",
  {
    titulo: { type: DataTypes.STRING, allowNull: false },
    contenido: { type: DataTypes.TEXT, allowNull: false },
    imagenAsociada: { type: DataTypes.TEXT, allowNull: true }, 
    fechaPublicacion: { type: DataTypes.STRING, allowNull: false },
    vigente: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true } // <-- AGREGÁ ESTA LÍNEA
  },
  {
    tableName: "publicaciones",
    timestamps: true,
  }
);
Publicacion.belongsTo(Empleado, { as: "empleado", foreignKey: "empleadoId" });
module.exports = Publicacion;
