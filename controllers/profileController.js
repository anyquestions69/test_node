const {User} = require('../models/user')
const { Op } = require("sequelize");
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const { validationResult,  } = require('express-validator');
class Manager{
   
    async getOne(req,res){
        try {
            const user = await User.findOne({where:{id:req.params['id']}})
            return res.send(user)
        } catch (error) {
            return res.send(error.toJSON())
        }
    }

    async getAll(req,res){
        try{
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
            let {firstname, lastname, email,  password} = req.body
            let usr = await User.update({
                firstname:firstname, 
                lastname:lastname,
                email:email,
                password:password,
                imgPath:req.files[0].filename
            },{where:{id:req.user.id}})
            return res.send(usr)
        
        } catch (error) {
            return res.status(404).send(error.toJSON())
        }
    }
    
    
    
}
module.exports = new Manager()