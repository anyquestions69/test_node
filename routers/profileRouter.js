const express = require("express");
const userController = require("../controllers/profileController.js");
const userRouter = express.Router();
const {  param, body} = require('express-validator');
const verifyToken = require('../middlewares/verifyToken.js')
const upload = require('../config/multerConf');
const { User } = require("../models/user.js");
const isOwner = require("../middlewares/isOwner.js");


userRouter.get('/', userController.getAll)
userRouter.get('/:id', param('id').notEmpty().isDecimal().custom(async value=>{
        if(!await User.findByPk(value))throw new Error('Такого id не существует')
    }),
    verifyToken, userController.getOne)

userRouter.put('/:id', [ 
    body('firstname').optional(),
    body('lastname').optional(),
    body('email').optional(),
    body('password').optional(),

    ],
    param('id').notEmpty().isDecimal().custom(async value=>{
        if(!await User.findByPk(value))throw new Error('Такого id не существует')
    }), 
    verifyToken, isOwner, upload.any(), userController.update)

 
module.exports = userRouter;