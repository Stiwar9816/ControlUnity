const Users = require('../models/user');
const bcrypt = require('bcrypt');
const CONFIG = require('../config/config.js')

const jwt = require('jsonwebtoken')
// const service = require('../services')

module.exports = {

    // Register, login, logout and forgot users 

    register: async (req, res, next) => {
        const {cc, name, email, password} = req.body;
      const ccUser = await Users.findOne({cc:cc})
        if(ccUser){
            res.status(404).send({message: 'Este usuario ya existe!'})
        }else{
            const newUser = new Users({cc,name,email,password})
            const User = await newUser.save()
            res.status(200).json({newUser: User})
        }   
    },

    // Login user decoding token, permited access to pages authenticated
    login: async (req, res, next) => {
        let cc = req.body.cc;
        let password = req.body.password;
        Users.findOne({cc})
            .then(user => {
                if (!user) return res.status(402).send({
                    message: "Usuario Incorrecto"
                });
                // debugger
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (match) {
                            payload ={
                                cc: user.cc,
                                name: user.name,
                                email: user.email,
                                role: user.role
                            }
                            // Acceso
                            jwt.sign(payload, CONFIG.SECRET_TOKEN, function(error,token){
                                if(error){
                                    res.status(500).send({error})
                                }else{
                                res.status(200).send({token:token})
                                }
                            })
                        }else{
                             res.status(402).send({
                                message: 'Contraseña Incorrecta'
                            }) // No Acceso
                        }
                    }).catch(error => {
                        console.log(error)
                        res.status(500).send({
                            error
                        })
                    })
            }).catch(error => {
                console.log(error);
                res.status(500).send({
                    error
                });
            });
    },

    //Destroy token deleting acess to pages 
    logout: async (req, res, next) => {
        req.logout()
        res.redirect(`http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`)
    },

    // Crud from User

    // Get all users
    allUser: async (req, res, next) => {
        const users = await Users.find({})
        res.status(200).json({
            users: users
        })
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
        await Users.findByIdAndRemove(userId)
        res.status(204).json({
            success: true
        })
    }
}