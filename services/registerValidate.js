module.exports = (email, password, repass)=>{
    if(!email) return false
    if(email.replace(' ','')=='')
            return false
    const re = /(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})/g
    if(re.test(email) | re.test(password)) return false
    if(repass!=password) return false
   
}