const {User} = require('../models/user')
const { Op } = require("sequelize");
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const { body, validationResult, matchedData} = require('express-validator');
const { error } = require('console');

class Manager{
   
    async register(req, res){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            
            const {firstname, lastname, email, password, repass} = req.body
            const user = await User.create({
                firstname,
                lastname,
                email,
                password
            })
            const token = jwt.sign({id:user.id, email:user.email}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            return res.cookie('user',token, { maxAge: 1200000, httpOnly: true }).send(user)
        }catch(e){
            return res.status(404).send(error.toJSON())
        }
    }

    async login(req,res){
        try{
            let {email, password} = req.body
            let user = await User.findOne({where:{email}})
            if(!user) return res.status(401).send({error:'Такого email не существует'})

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(400).json({ error: 'Неверный пароль' });

            const token = jwt.sign({id:user.id, email:user.email}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            return res.cookie('user',token).send({token})
        }catch(e){
            return res.status(405).send({error:e.toJSON()})
        }
    }

    
} 
module.exports = new Manager()