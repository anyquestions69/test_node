const express = require("express");
const userController = require("../controllers/profileController.js");
const userRouter = express.Router();
const {  param, body} = require('express-validator');
const verifyToken = require('../middlewares/verifyToken.js')
const upload = require('../config/multerConf');
const { User } = require("../models/user.js");


userRouter.get('/', userController.getAll)
userRouter.get('/:id', param('id').notEmpty().isDecimal().custom(async value=>{
        if(!await User.findByPk(value))throw new Error('Такого id не существует')
    }),
    verifyToken, userController.getOne)

userRouter.put('/:id', [
    param('id').notEmpty().isDecimal().custom(async value=>{
        if(!await User.findByPk(value))throw new Error('Такого id не существует')
    }),  
    body('firstname'),
    body('lastname'),
    body('email'),
    body('password'),

    ],
    verifyToken, upload.single('image'), userController.update)

 
module.exports = userRouter;