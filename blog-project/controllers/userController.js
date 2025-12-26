const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/generateToken")
exports.register = async (req, res) =>{
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return res.status(401).json({message: "All fields are Required !"})
    }
    
    const extuser = await User.findOne({email})
    if (extuser) {
        return res.status(401).json({message: "Email is Already Exist !"})
    }
    const hidePassword = await bcrypt.hash(password, 10) 

    const newUser = await User.create({ 
        name, 
        email, 
        password: hidePassword
    })
    
    res.status(201).json({message: "User registered Successfully.",  newUser})
}

exports.login = async(req, res)=>{   
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(401).json({message: "Email and Password are Required !"})
    }

    const user = await User.findOne({email}).select("+password")
    if (!user) {
        return res.status(401).json({ success: false, message: "User not Found !"})
    }
    const pass = await bcrypt.compare(password, user.password)
    if (!pass) {
        return res.status(401).json({message: "password doesn't match !"})
    }
    const token = generateToken(user._id, res)
    res.status(201).json({ success: true, message: "Log in Successfull.", user, token})
}

exports.getall = async(req, res)=>{
    const allUser = await User.find()
    res.status(201).json({success: true, allUser})
}

exports.getbyId = async(req, res)=>{
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
        return res.status(400).json({message: "User not Found !"})
    }
    res.status(201).json({success: true, user})
}

exports.update = async(req, res)=>{
    const {name , email} = req.body
    if (!name || !email) {
        return res.status(401).json({message: "All fields are Required"})
    }
    const id = req.params.id
    const user = await User.findByIdAndUpdate(id,{name, email},
    {
        new : true,
        runValidators: true
    }
    )
    if (!user) {
        return res.status(401).json({message: "User not Found !"})
    }
    res.status(201).json({success: true, user})
}

exports.deleteUser = async(req, res)=>{
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        return res.status(401).json({message: "User not Found !"})
    }
    res.status(201).json({success: true , message: "Deleted Successfully." })
}