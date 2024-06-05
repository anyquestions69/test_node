const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter.js')
const profileRouter = require('./routers/profileRouter.js')

app.use(express.json());
//app.use(cookieParser)
app.get('/',(req,res)=>{return res.send('hi')})
app.use('/user', userRouter)
app.use('/profile', profileRouter)

app.listen(PORT, () => {
    console.log(process.env.TOKEN_SECRET)
    console.log(`Server is running on port ${PORT}`);
});