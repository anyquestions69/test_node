const {User} = require('../models/user')
const { Op } = require("sequelize");
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const { validationResult, matchedData,  } = require('express-validator');
class Manager{
   
    async getOne(req,res){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            
            const {id}  = matchedData(req)
            const user = await User.findByPk(id)
            return res.send(user)
        } catch (error) {
            return res.send(error.toJSON())
        }
    }

    async getAll(req,res){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const page=req.query.page
            const limit = 10
            const result = await User.findAndCountAll( {offset: page>=1?((page-1)*2):0, limit: limit})
            return res.send(result)
        }catch (error) {
            return res.send(error.toJSON())
        }
        
    }

    async update(req,res){
        try {
            const {id, firstname, lastname, email,  password} = matchedData(req)
            const userData = {}
            if(firstname)userData.firstname=firstname
            if(lastname)userData.lastname=lastname
            if(email)userData.email=email
            if(password)userData.password=password
            if(req.files.length>0)userData.imgPath=req.files[0].filename
            const usr = await User.update(userData,{where:{id}})
            return res.send(usr)
        
        } catch (error) {
            return res.status(404).send(error.toJSON())
        }
    }
    
    
    
}
module.exports = new Manager()