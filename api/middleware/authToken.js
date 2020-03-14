const jwt = require('jsonwebtoken')
const express = require('express')
const CONFIG = require('../config/config.js')
const auth = express.Router();
module.exports = auth.use((req, res, next)=>{

            let token = req.headers['access-token'];
            jwt.verify(token,CONFIG.SECRET_TOKEN,function(error,decoded){
                if(error) return res.status(200).send({message: 'Usuario eliminado'});
                if(req.method != 'GET'){
                    if(decoded.role == 'Planeacion') next();
                    else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
                }else{
                    next();
                }
            });
next();
})