const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const dotenv = require("dotenv")
dotenv.config()

exports.isAuth = async(req, res, next) =>{
    try {
        const {token} = req.cookies
        
        if (!token) {
            return res.status(401).json({message: "User not Authentication !"})
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
            
        const user = await User.findById(decode.id)
        if (!user) {
            return res.status(401).json({message: "User not Found !"})
        }
        req.user = user
        next()
        
    } catch (error) {
        return res.status(501).json({message: "Error while Authentication !",error})
    }
}