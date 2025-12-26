const express = require("express")
const { register, login, getbyId, update, deleteUser, getall } = require("../controllers/userController")
const upload = require("../middleware/cloudinary")
const { isAuth } = require("../middleware/isAuth")
const router = express.Router()

router.post("/registration", register)
router.post("/login", login)
router.get("/getall", getall)
router.get("/get/:id", isAuth, getbyId)
router.put("/update/:id", isAuth, update)
router.delete("/delete/:id", isAuth, deleteUser)

module.exports = router