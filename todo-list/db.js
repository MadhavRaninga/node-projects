const mongoose = require("mongoose")

exports.connectDB = () => {
    try {
        mongoose.connect("mongodb://localhost:27017/")
        .then(() => console.log("DB Connected Successfully."))
        .catch(() => console.log("Error DB is while Connect")
        )
    } catch (error) {
        console.error("Server Error", error)
    }
}