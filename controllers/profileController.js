const {User} = require('../models/user')
const pagination = require('../services/pagination')
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
            const page=req.query.page||1
            const limit = 10
            const result = await User.findAndCountAll({offset: page>=1?((page-1)*2):0, limit: limit})
            return res.send(pagination(result,page, limit))
        }catch (error) {
            console.warn(error)
            return res.send({error:error.data})
        }
        
    }

    async update(req,res){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const {id, firstname, lastname, email,  password} = matchedData(req)
            console.log(matchedData(req))
            const userData = {}
            if(firstname)userData.firstname=firstname
            if(lastname)userData.lastname=lastname
            if(email)userData.email=email
            if(password)userData.password=password
            if(req.files&&req.files.length>0)userData.imgPath=req.files[0].filename
            console.log(req.files)
            const usr = await User.update(userData,{where:{id}})
            return res.send({updatedFields:userData})
        
        } catch (error) {
            console.log(error)
            return res.status(406).send(error.data)
        }
    }
    
    
    
}
module.exports = new Manager()