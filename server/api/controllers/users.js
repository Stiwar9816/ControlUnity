const Users = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

function register(req, res, next) {
    const user = new Users({
        cc: req.body.cc,
        name: req.body.name,
        email: req.body.email,
        passwaord: req.body.password
    })
    debugger
         bcrypt.hash(password, 15, (error, hash)=>{
            if(error){
                res.status(500)
                return res.json({Ok: false})
            }
           user.save({cc, name, email, password :hash})
          .then(function (doc){
              res.json({ok: true})
            })
            .catch(error =>{
                debugger
                res.send("Erro: " + error)
                res.status(500)
                res.json({Ok:false})
            })
        })
    }
    
    async function login(req, res, next){
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
module.exports = {
    register,
    login
}