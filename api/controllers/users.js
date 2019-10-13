const Users = require('../models/user');
const service = require('../services')

module.exports = {

    // Register, login, logout and forgot users 

    // Register user add one token unique
    register: async (req, res, next) => {
        const user = new Users({
            cc: req.body.cc,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        user.password =  await user.encryptPassword(user.password)
        user.save((err) => {
            if (err) res.status(500).send({
                message: `Error al crear el usuario: ${err}`
            })
            return res.status(200).send({
                token: service.createToken(user)
            })
        })
    },

    // Login user decoding token, permited access to pages authenticated
    login: async (req, res, next) => {
        const {cc, password} = req.body;
        Users.find({
            cc: cc
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
        const passwordValidate = await user.comparePassword(password) 
        if(!passwordValidate){
            res.status(401).send({message: 'Constraseña invalida', token: null})
        }
    },

    //Destroy token deleting acess to pages 
    logout: async (req, res, next) => {
        req.logout()
        res.redirect('http://localhost:3000')
    },

    // Crud from User

    // Get all users
    allUser: async (req, res, next) => {
        const users = await Users.find({})
        res.status(200).json({users: users})
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
        await Users.findOneAndDelete(userId)
        res.status(204).json({
            success: true
        })
    }
}