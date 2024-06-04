const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
const verifyToken = require('../middleware/verifyToken.js')
 
userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)

 
module.exports = userRouter;