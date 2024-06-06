const {User} = require('../models/user')
const jwt = require('jsonwebtoken')
const {  validationResult, matchedData} = require('express-validator');
const bcrypt = require('bcrypt')

class Manager{
   
    async register(req, res){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            
            const {firstname, lastname, email, password, repass} = matchedData(req)
            const user = await User.create({
                firstname,
                lastname,
                email,
                password
            })
            const token = jwt.sign({id:user.id, email:user.email}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            return res.cookie('user',token, { maxAge: 1200000, httpOnly: true }).send({token,id:user.id})
        }catch(e){
            console.log(e)
            return res.status(401).send({error:e.data})
        }
    }

    async login(req,res){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const {email, password} = matchedData(req)
            const user = await User.findOne({where:{email}})
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) return res.status(400).json({ error: 'Неверный пароль' });

            const token = jwt.sign({id:user.id, email:user.email}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            return res.cookie('user',token).send({token:token,id:user.id})
        }catch(e){
            console.log(e)
            return res.status(405).send({error:e.data})
        }
    }

    
} 
module.exports = new Manager()