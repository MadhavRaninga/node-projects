const mongoose = require("mongoose")

exports.ConnectDB = () => {
    try {
        mongoose.connect("mongodb://localhost:27017")
        .then(() => console.log("DB Connected Successfully."))
        .catch(()=>console.log("Error While Connected"))
    } catch (error) {
        console.error("Error in DB", error)
    }
}