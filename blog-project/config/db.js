const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
exports.connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Db Connected Successfully."))
    .catch(()=>console.log("Error While Connection"))
    
  } catch (error) {
    console.log("DB Error:", error)
  }
}