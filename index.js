// const http = require("http")

const express = require("express")
const app = express()

// const server = http.createServer((req, res)=>{
//     res.writeHead(200, {"Content-Type" : "text/html"})
//     res.write("<h1>Hello Dev</h1>")
//     res.end()
// })

app.get("/home",(req, res)=>{
    res.send("<h1>Hello I'm Madhav.</h1>")
})

app.listen(3000, ()=>{
    console.log("Server is Working on port 5000");
})