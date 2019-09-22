const Users = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

module.exports = {

//  register: async (req, res, next)=> {
//     const { cc, name, email, password} = req.body
//     debugger
//          bcrypt.hash(password, 10, (error, hash)=>{
//             if(error){
//                 res.status(500)
//                 return res.json({Ok: false})
//             }
//             .then(function (doc){
//                 Users.create({cc, name, email, password :hash})
//               res.json({ok: true})
//             })
//             .catch(error =>{
//                 debugger
//                 res.send("Erro: " + error)
//                 res.status(500)
//                 res.json({Ok:false})
//             })
//         })
//     },
    
    login: async (req, res, next) =>{
        console.log('Hola Soy el registro')
        await Users.findOne({
            cc: req.body.cc
        })
        .then(user =>{
            if(user){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const payload ={
                        _id: user._id,
                        cc: user.cc,
                        name: user.name,
                        email: user.email
                    }
                    console.log(user.name)
                    let token = jwt.sing(payload, 'IS A SECRET',{
                        expiresIn: 1440
                    })
                    res.send(token)
                }else{
                    res.json({error: 'User does not exist' })
                }
            }else{
                res.json({error: 'User does not exist' })
            }
        })
        .catch(error=>{
            res.send('error: ' + error)
        })
    }
}