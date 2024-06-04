const Sequelize = require("sequelize");
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT||3306}/${process.env.DB_NAME}`)

module.exports = sequelize