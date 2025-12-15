const express = require("express")
const { registration, login, getall, getbyId, update, deleteUser } = require("../controllers/userController")
const router = express.Router()

router.post("/registration", registration)
router.post("/login", login)
router.get("/getall", getall)
router.get("/get/:id", getbyId)
router.put("/update/:id", update)
router.delete("/delete/:id", deleteUser)

module.exports = router