// const jwt = require('jsonwebtoken')
// const CONFIG = require('../config/config.js')

// module.exports = function(req, res, next){
//     if(req.path != '/api/login' && req.path != '/api/register' && req.path != '/home' && req.path != '/salones' && req.path != '/implementos' && req.path != '/' && req.path != '/reservar'){
//         if(req.headers.authorization){
//             let token = req.headers.authorization.split(' ')[1];
//             jwt.verify(token,CONFIG.SECRET_TOKEN,function(error,decoded){
//                 if(error) return res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...',error});
//                 if(req.method != 'GET'){
//                     if(decoded.role == 'admin') next();
//                     else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
//                 }else{
//                     next();
//                 }
//             });
//         }else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
//     }else next();
// }