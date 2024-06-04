const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter.js')
const profileRouter = require('./routers/profileRouter.js')

app.use(express.json());
app.use(cookieParser)
app.use('/user', userRouter)
app.use('/profile', profileRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});