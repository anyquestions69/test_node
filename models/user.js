const {DataTypes} = require("sequelize");
const sequelize = require('../config/db')
const {Gender} = require('gender')
const hash =require('../services/passwordHash')
const User = sequelize.define("user", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull: false
    },
    lastname:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstname} ${this.lastname}`;
        },
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value) {
            this.setDataValue('password', hash(value));
          },
    },
    imgPath:{
      type:DataTypes.STRING,
    }
});
User.hasOne(Gender)
sequelize.sync({force: true})

module.exports = {User}