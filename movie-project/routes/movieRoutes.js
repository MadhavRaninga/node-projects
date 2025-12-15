const express = require("express")
const { addMovie, getall, getbyId, update, deleteMovie } = require("../Controller/movieController")
const router = express.Router()

router.post("/addmovie", addMovie)
router.get("/getall", getall)
router.get("/get/:id", getbyId)
router.put("/update/:id", update)
router.delete("/delete/:id", deleteMovie)

module.exports = router; 