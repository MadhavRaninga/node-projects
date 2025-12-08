const express = require("express");
const { connectDB } = require("./db");
const User = require("./model")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:5173/" })); 

app.post("/addTask", async (req, res) => {
    const { task } = req.body
    if (!task) {
        return res.status(404).json({ message: "Please Enter Task !" })
    }
    const existTask = await User.findOne({ task })
    if (existTask) {
        return res.status(404).json({ message: "Task is Already Exist !" })
    }

    const newTask = await User.create({
        task
    })
    res.status(201).json({ message: "Task Added Successfully.", newTask })
})
app.get("/getall", async (req, res) => {
    const allTask = await User.find()
    res.status(200).json({ success: true, allTask })
})

app.get("/get/:id", async (req, res) => {
    const id = req.params.id
    const task = await User.findById(id)
    if (!task) {
        return res.status(404).json({message: "Task not Found !"})
    }
    res.status(201).json({success: true, task})
})
app.put("/update/:id", async (req, res) => {
    const id = req.params.id
    const {task} = req.body
    const updateTask = await User.findByIdAndUpdate(id, { task },
        {
            new: true,
            runValidators: true
        }
    )
    if (!updateTask) {
        return res.status(404).json({ message: "Task not Found !" })
    }
    res.status(201).json({ success: true, message: "Task Updated Successfully." , updateTask})
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const task = await User.findByIdAndDelete(id)

    if (!task) {
        return res.status(404).json({ message: "Task not Found !" })
    }
    res.status(201).json({ success: true, message: "Task Deleted Successfully." })
})
connectDB()
app.listen(4000, () => {
    console.log("Server is Working on : 4000");
})