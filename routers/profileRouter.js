const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
const {  param } = require('express-validator');
const verifyToken = require('../middleware/verifyToken.js')
const upload = require('../config/multerConf');
const { User } = require("../models/user.js");


userRouter.get('/', userController.getAll)
userRouter.get('/:id', param('id').notEmpty().isDecimal().custom(async value=>{
        if(!await User.findByPk(value))throw new Error('Такого id не существует')
    }),
    verifyToken, userController.getOne)
    
userRouter.put('/:id', 
    param('id').notEmpty().isDecimal().custom(async value=>{
        if(!await User.findByPk(value))throw new Error('Такого id не существует')
    }),  
    verifyToken, upload.single('image'), userController.update)

 
module.exports = userRouter;