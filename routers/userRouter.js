const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
const { body } = require('express-validator');
const verifyToken = require('../middleware/verifyToken.js')
const {isInUse, notInUse} = require('../services/emailValidation.js')
 
userRouter.post('/register', [
    body('firstname').notEmpty().withMessage('Введите имя'),
    body('email').notEmpty().withMessage('Введите email').isEmail().custom(isInUse),
    body('password').notEmpty().withMessage('Введите пароль').isLength({ min: 6 }).withMessage('Минимальная длина пароля - 6 символов'),
    body('repass').custom((value, {req}) => value === req.body.password).withMessage('Пароли не совпадают')  
  ], 
  userController.register)

userRouter.post('/login', [
    body('email').notEmpty().withMessage('Введите email').isEmail().withMessage('Введите валидный email').custom(notInUse),
    body('password').notEmpty().withMessage('Введите пароль'),
 ],
 userController.login)

 
module.exports = userRouter;