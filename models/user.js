const {DataTypes} = require("sequelize");
const sequelize = require('../config/db')
const {Gender} = require('./gender.js')
const bcrypt = require('bcrypt')

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
        type:DataTypes.TEXT
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
            const saltRounds = 10;
            const hash = bcrypt.hashSync(value, saltRounds)
            console.log(hash)
            this.setDataValue('password', hash);
          
        }
    },
    imgPath:{
      type:DataTypes.STRING,
    }
});
User.addHook('beforeFind', async (options, user) => {
    if (options.attributes && options.attributes.includes('password')) {
      options.attributes = options.attributes.filter(attr => attr!== 'password');
    }
  });
User.hasOne(Gender)
sequelize.sync({force: true})

module.exports = {User}