const {User} = require('../models/user')
const { Op } = require("sequelize");
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')


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
        const page=req.query.page
        const limit = 10
        const result= await User.findAndCountAll( {offset: page>=1?((page-1)*2):0, limit: limit})
        return res.send(result)
    }

    async register(req, res){
        try{
            let {firstname, lastname, email, password,repass} = req.body
            
            let exists = await User.findOne({where:{email:email}})
            if(exists)
                return res.status(401).send('Пользователь с таким именем уже существует. Попросите администратора удалить Ваш старый аккаунт прежде чем создавать новый.')
            let user = await User.create({
                firstname,
                lastname,
                email:email,
                password:password,
                
            })
            const token = jwt.sign({id:user.id, email:user.email}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            return res.cookie('user',token, { maxAge: 1200000, httpOnly: true }).send(user.email)
        }catch(e){
            console.log(e)
            return res.status(404).send('Ошибка')
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
            console.log(e)
            return res.status(405).send({error:e})
        }
    }

    async logout(req,res){
        return res.clearCookie("user").status(200);
    }


    async update(req,res){
        try {
            let {firstname, lastname, email,  password} = req.body
            if(name){
                if(name.replace(' ','')=='')
                    return res.status(401).send('Заполните ФИО')
            }
            let re = /(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})/g
            if(re.test(name) | re.test(password))
                return res.status(401).send('Не пытайтесь взломать нас')
            
                let usr = await User.update({
                    firstname:firstname, 
                    image:req.files[0].filename
                },{where:{id:req.user.id}})
                return res.send(usr)
        
        } catch (error) {
            return res.status(404).send(error.toJSON())
        }
    }
    
    async delete(req,res){

    }
    
    
}
let manager = new Manager()
module.exports = manager