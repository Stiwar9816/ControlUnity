const helpers = {}

helpers.isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('http://localhost:3000')
}

module.exports = helpers