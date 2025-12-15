const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

exports.registration = async(req, res)=>{
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        return res.status(404).json({message: "All Fields are Required !"})
    }
    const extuser = await User.findOne({email})
    if (extuser) {
        return res.status({message: "Email Already Exist !"})
    }
    const hidePass = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        name,
        email,
        password: hidePass
    })
    res.status(201).json({message: "User Registered Successfully.", newUser})
}

exports.login = async (req, res)=>{
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(401).json({message: "Email & Password are Required !"})
    }
    const user = await User.findOne({email}).select("+password")
    if (!user) {
        return res.status(401).json({message: "User not Found !"})
    }
    const matchPass = await bcrypt.compare(password, user.password)
    if (!matchPass) {
        return res.status(401).json({message: "Password doesn't Match !"})
    }

    res.status(201).json({message: "Log in Successfully.", user})
}

exports.getall = async(req, res) =>{
    const users = await User.find()
    res.status(201).json({success: true, users})
}

exports.getbyId = async(req, res) =>{
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
        return res.status(401).json({message: "User not Found"})
    }
    res.status(201).json({success: true, user})
}

exports.update = async(req, res) =>{
    const id = req.params.id
    const {name , email} = req.body
    if (!name || !email) {
        return res.status(401).json({message: "All Fields are Required !"})
    }
    const user = await User.findByIdAndUpdate(id,{name, email},
        {
            new: true, 
            runValidators: true
        }
    )
    if (!user) {
        return res.status(401).json({message: "User not Found !"})
    }
    res.status(201).json({message: "User Updated Successfully.", user})
}

exports.deleteUser = async(req, res) =>{
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        return res.status(401).json({message: "User not Found !"})
    }
    res.status(201).json({message:"User Deleted Successfully."})
}