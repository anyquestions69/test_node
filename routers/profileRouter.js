const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
const verifyToken = require('../middleware/verifyToken.js')
 
userRouter.get('/', userController.getAll)
userRouter.get('/:id', verifyToken, userController.getOne)
userRouter.put('/:id', userController.update)

 
module.exports = userRouter;