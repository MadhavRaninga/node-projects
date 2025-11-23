const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const student = [{id: 1, name: "Madhav", age: 20}]

app.get("/getall",(req, res)=>{
    res.send(student)
})

app.get("/student/:id",(req, res)=>{
    const id = parseInt(req.params.id)
    const stu = student.find((s)=> s.id == id)
    if (!stu) {
        return res.status(404).json({message: "Student data not Found !"})
    }
    res.status(201).json({message: "Student data Found Successfully.", data : stu})
})
app.post("/get", (req, res)=>{
    const {name, age} = req.body
    const newStudent = {
        id : student.length + 1,
        name,
        age : parseInt(age)
    }
    student.push(newStudent)
    res.status(201).json({message: "Data add Successfully." , data: newStudent})
})

app.put("/update/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    const {name , age} = req.body
    const stu = student.find((s)=> s.id == id)

    if (!stu) {
        return res.status(404).json({message: "Student Data not Found !"})
    }
    stu.name = name
    stu.age = age
    res.status(201).json({message: "Data Updated Successfully.", data: stu})
})

app.delete("/delete/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    const stu = student.findIndex((s)=> s.id == id)

    if (stu == -1) {
        return res.status(404).json({message: "Student data not Found !"})
    }
    student.splice(stu, 1)
    res.status(201).json({message: "Data Deleted Successfully."})
    
})
app.listen(5000,()=>{
    console.log("Server Working..");
})