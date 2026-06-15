const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("proyectodb", "postgres", "admin123", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});


sequelize
  .authenticate()
  .then(() => console.log("DB is connected to PostgreSQL"))
  .catch((err) => console.error("Error al conectar a PostgreSQL:", err));
module.exports = sequelize;
