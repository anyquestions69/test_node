const bcrypt = require('bcrypt')
const saltRounds = 10; 
module.exports = async (password)=>{
    return  await bcrypt.hash(password, saltRounds);
}