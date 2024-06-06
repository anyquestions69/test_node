const {User} = require('../models/user')
const {Gender} = require('../models/gender')
const EmailValidation = require('../services/emailValidation')
const { check } = require('express-validator')
class Validator{
    async email(value){
        if(value){
            EmailValidation.isInUse()
        }
    }
    async name(value){
        if(value){
            if(value.isAlpha()) throw new Error('Имя некорректное');
        }
    }
    async password(value){
        if(value){
            if(check(value).isLength({min:6})) throw new Error('Минимальная длина пароля - 6 символов');
        }
    }
    async gender(value){
        const genders = await Gender.count()
        if(value){
            if(value<1||value>genders)throw new Error('Выберите пол из допустимых: 1-М, 2-Ж');
        }
    }
}
module.exports = new Validator()