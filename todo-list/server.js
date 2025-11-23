const express = require("express");
const { connectDB } = require("./db");
const User = require("./model")
const bcrypt = require("bcryptjs")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.post("/registration", async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are Required !" })
        }
        const extuser = await User.findOne({ email })
        if (extuser) {
            return res.status(401).json({ message: "Email already Registered !" })
        }
        const hidePass = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email,
            password: hidePass
        })
        res.status(201).json({ message: "User Registered Successfully.", newUser })
    } catch (error) {
        res.status(402).json({ message: "Server Error !", error })
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(401).json({ message: "Email and Password are Required !" })
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return res.status(401).json({message: "User not Found !"})
    }

    const mathchPass = await bcrypt.compare(password, user.password)
    if (!mathchPass) {
        return res.status(404).json({success: false, message: "Password Doesn't match !"})
    }
    res.status(200).json({success: true, message: "Log in Successfully.", user})
})

app.get("/getall", async(req, res)=>{
    const allUser = await User.find()
    res.status(201).json({success: true, allUser})
})

app.get("/get/:id", async(req, res)=>{
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({message: "User not Found"})
    }
    res.status(200).json({success: true, user})
})

app.put("/update/:id", async(req, res)=>{
    const id = req.params.id
    const {name , email} = req.body

    const user = await User.findByIdAndUpdate(id,{name,email},
        {
            new: true,
            runValidators: true
        }
    )
    if (!user) {
        return res.status(404).json({message: "User not Found !"})
    }
    res.status(201).json({success: true, message: "User Data Updated Successfully.", user})
})

app.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        return res.status(404).json({message: "User not Found"})
    }
    res.status(201).json({success: true, message: "User Deleted Successfully.."})
})
app.listen(5000, () => {
    console.log("Server is Working on : 5000");
})
