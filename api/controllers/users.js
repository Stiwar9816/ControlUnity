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
    },

    // Crud from User

    // Get all users
    allUser: async (req, res, next) => {
        const users = await Users.find({})
        res.status(200).json(users)
    },

    // Get one implement from id
    getOneUser: async (req, res, next) => {
        const id = req.params.id
        const user = await Users.findById(id)
        res.status(200).json(user)
    },

    // Update one implement from id
    updateUser: async (req, res, next) => {
        const userId = req.params.id
        const newUser = req.body
        const oldUser = await Users.findByIdAndUpdate(userId, newUser)
        res.status(200).json(oldUser)
    },

    // Delete one implement from id
    deleteUser: async (req, res, next) => {
        const userId = req.params.id
        await Users.findOneAndRemove(userId)
        res.status(204).json({
            success: true
        })
    }
}