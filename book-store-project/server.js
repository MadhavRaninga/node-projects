const express = require("express")
const { connectDB } = require("./config/db")
const dotenv = require("dotenv")
const bookRoutes = require("./routes/router")

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/book", bookRoutes)
connectDB()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Working on : ${process.env.PORT}`);
    
})