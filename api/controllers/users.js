const Users = require('../models/user');
const service = require('../services')
// const bcrypt = require('bcrypt-nodejs');

module.exports = {

    register: async (req, res, next) => {
        const user = new Users({
            cc: req.body.cc,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        user.save((err) => {
            if (err) res.status(500).send({
                message: `Error al crear el usuario: ${err}`
            })
            return res.status(200).send({
                token: service.createToken(user)
            })
        })
    },


    // register: async (req, res, next) => {
    //     const {
    //         cc,
    //         name,
    //         email,
    //         password
    //     } = req.body
    //     // debugger
    //     // const errors = []
    //     // if(cc.length <= 0){
    //     //     errors.push({text: 'Porfavor ingrese su CC'})
    //     // }
    //     // if(password != confirm_password){
    //     //     errors.push({text: 'Las constraseñas no coinciden'})
    //     // }
    //     // if (password.length < 6){
    //     //     errors.push({text: 'La contraseña debe ser de minimo 6 digitos'})
    //     // }
    //     // if(errors.length > 0){
    //     //     res.render('http://localhost:3000/registro', {errors, cc, name, email, password, confirm_password})
    //     // }else{
    //     const ccUser = await Users.findOne({
    //         cc: cc
    //     })
    //     if (ccUser) {
    //         console.log('Ya se esta usando esta cedula')
    //     }
    //     const newUser = new Users({
    //         cc,
    //         name,
    //         email,
    //         password
    //     })
    //     newUser.password = await newUser.encryptPassword(password)
    //     await newUser.save()
    //     res.status(200).json({
    //         Ok: 'Usuario Registrado'
    //     })

    //     //     bcrypt.hash(password, 10, (error, hash)=>{
    //     //        if(error){
    //     //            res.status(500)
    //     //            return res.json({Ok: false})
    //     //        }
    //     //        .then(function (doc){
    //     //            Users.create({cc, name, email, password :hash})
    //     //          res.json({ok: true})
    //     //        })
    //     //        .catch(error =>{
    //     //            debugger
    //     //            res.send("Erro: " + error)
    //     //            res.status(500)
    //     //            res.json({Ok:false})
    //     //        })
    //     //    })
    //     // }
    // },

    login: async (req, res, next) => {
        Users.find({
            cc: req.body.cc
        }, (err, user) => {
            if (err) return res.status(500).send({
                message: err
            })
            if (!user) return res.status(404).send({
                message: 'No existe el usuario'
            })

            req.user = user
            res.status(200).send({
                message: 'Te has logeado correctamente',
                token: service.createToken(user)
            })
        })
    },

    // login: async (req, res, next) => {

    //     await Users.findOne({
    //             cc: req.body.cc
    //         })
    //         .then(user => {
    //             if (user) {
    //                 if (bcrypt.compare(req.body.password, user.password)) {
    //                     const payload = {
    //                         _id: user._id,
    //                         cc: user.cc,
    //                         name: user.name,
    //                         email: user.email,
    //                         phone: user.phone
    //                     }
    //                     console.log(user.phone)
    //                     let token = jwt.sign(payload, process.env.SECRET_KEY, {
    //                         expiresIn: 1440
    //                     })
    //                     res.send(token)
    //                 } else {
    //                     res.json({
    //                         error: 'User does not exist'
    //                     })
    //                 }
    //             } else {
    //                 res.json({
    //                     error: 'User does not exist'
    //                 })
    //             }
    //         })
    //         .catch(err => {
    //             res.send('error: ' + err)
    //         })
    // },

    logout: async (req, res, next) => {
        req.logout()
        res.redirect('http://localhost:3000')
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