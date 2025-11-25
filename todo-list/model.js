const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    task:{
        type: String,
        required: [true, "Please Enter Task."],
    }
})

module.exports = mongoose.model("User", userSchema)