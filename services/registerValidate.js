module.exports = (email, )=>{
    if(email)
        if(email.replace(' ','')=='')
            return res.status(401).send('Заполните ФИО')
    let re = /(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})/g
    if(re.test(email) | re.test(password))
        return res.status(401).send('Не пытайтесь взломать нас')
    if(repass!=password)
        return res.status(401).send('Пароли не совпадают')
   
}