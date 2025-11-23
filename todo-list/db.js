const mongoose = require("mongoose")

exports.connectDB = () => {
    try {
        mongoose.connect("mongodb://localhost:27017")
        .then(() => console.log("DB Connected Successfull."))
        .catch(() => console.log("error while Connection DB !")
            )
    } catch (error) {
        console.error("Error to connect DB !", error)
    }
}