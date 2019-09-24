const mongoose = require('mongoose');
const User = require ('../models/user')
const service = require('../services')

module.exports = {
    
    signUp: async (req, res, next)=>{
        const user = new User({
            cc: req.body.cc,
            name:req.body.name,
            email:req.body.email
        })
        user.save((err)=>{
            if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
            return res.status(200).send({token: service.createToken(user)})
        })
    },

    signIn: async (req, res, next)=>{

    }
}