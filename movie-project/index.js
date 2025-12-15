const express = require("express")
const { connectDB } = require("./db/db")
const app = express()
const movieRouter = require("./routes/movieRoutes")
const dotenv = require("dotenv")
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/movies", movieRouter)
connectDB()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Working on : ${process.env.PORT}`);
})