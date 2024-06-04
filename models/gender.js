const {DataTypes} = require("sequelize");
const sequelize = require('../config/db')

const Gender = sequelize.define("gender", {
    name:{
        type:DataTypes.TEXT,
        allowNull:false,
        unique:true
    },
})
const genderArray=[{name:"Мужской"}, {name:"Женский"}]
sequelize.sync({force: true}).then(async function(res){
    if((await Gender.findAll()).length==0)
        await Gender.bulkCreate(genderArray, { validate: true })
})
module.exports = {Gender}