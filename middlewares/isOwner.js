async function isOwner(req,res,next){
    
    try {
        if(req.user.id!=req.params.id) return res.status(403).json({ error: 'Это не ваша учетная запись' })
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = isOwner;