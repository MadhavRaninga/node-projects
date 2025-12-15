const express = require("express")
const dotenv = require("dotenv")
const { ConnectDB } = require("./db/db")
const userRouter = require("./routes/userRoutes")

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/user", userRouter)

ConnectDB()
app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on : ${process.env.PORT}`);
})