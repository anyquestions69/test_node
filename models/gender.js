const {DataTypes} = require("sequelize");
const sequelize = require('../config/db')
const Gender = sequelize.define("gender", {
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
})


module.exports = {Gender}