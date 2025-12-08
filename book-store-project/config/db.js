const mongoose = require("mongoose")

exports.connectDB = () =>{
    try {
        mongoose.connect("mongodb://localhost:27017/")
        .then(()=>console.log("DB connected Successfully."))
        .catch(()=>console.log("Error While Connected !"))
    } catch (error) {
        console.error("Server Error !", error)  
    }
}