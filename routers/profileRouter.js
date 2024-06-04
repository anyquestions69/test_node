const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
const { body, validationResult } = require('express-validator');
const verifyToken = require('../middleware/verifyToken.js')
const upload = require('../config/multerConf')


userRouter.get('/', userController.getAll)
userRouter.get('/:id', verifyToken, userController.getOne)
userRouter.put('/:id', verifyToken, upload.single('image'), userController.update)

 
module.exports = userRouter;