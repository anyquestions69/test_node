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
            this.setDataValue('password', hash);
          
        }
    },
    imgPath:{
      type:DataTypes.STRING,
    }
}, {
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    }
});

User.belongsTo(Gender)
Gender.hasMany(User)
const genderArray=[{name:"Мужской"}, {name:"Женский"}]
sequelize.sync({force: true}).then(async function(res){
    if((await Gender.findAll()).length==0)
        await Gender.bulkCreate(genderArray, { validate: true })
})

module.exports = {User}