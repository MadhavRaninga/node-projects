const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, "Name is require"],
    },
    email:{
        type: String,
        required: [true, "Email is require"],
        unique: true
    },
    avatar:{
        type: String
    },
    password:{
        type: String,
        required: true,
        select: false
    }
})
module.exports = mongoose.model("User", userSchema)