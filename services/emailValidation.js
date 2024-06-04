const {User} = require('../models/user')
class EmailValidation{
    async notInUse(value){
        const user = await User.findOne({where:{email:value}});
        if (!user) {
          throw new Error('E-mail не используется');
        }
    }
    async isInUse(value){
        const user = await User.findOne({where:{email:value}});
        if (user) {
          throw new Error('E-mail уже используется');
        }
    }
}
module.exports =  EmailValidation()
