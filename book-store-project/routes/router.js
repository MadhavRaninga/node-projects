const express = require("express")
const { addbook, getall, getbook, update, deleteBook } = require("../controller/bookController")
const router = express.Router()

router.post("/addbook", addbook)
router.get("/getall", getall)
router.get("/get/:id", getbook)
router.put("/update/:id", update)
router.delete("/delete/:id", deleteBook)

module.exports = router