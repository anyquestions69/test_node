const jwt = require('jsonwebtoken');
const {User} = require('../models/user')

async function verifyToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET)
        let exists = await User.findByPk(user.id)
        if(!exists) return res.status(401).json({ error: 'Access denied' });
        req.user = exists
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;