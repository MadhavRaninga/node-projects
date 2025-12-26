const express = require("express")
const { connectDB } = require("./config/db")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/userRoute")
const blogRouter = require("./routes/blogRoutes")
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/api/user", userRouter)
app.use("/api/blog", blogRouter)

connectDB()

app.listen(process.env.PORT , ()=>{
    console.log(`Server is Working on : ${process.env.PORT}`);
})