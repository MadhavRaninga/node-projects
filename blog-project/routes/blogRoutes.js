const express = require("express")
const { createBlog, getallBlog, getbyId, update, deleteBlog } = require("../controllers/blogController")
const upload = require("../middleware/cloudinary")
const { isAuth } = require("../middleware/isAuth")
const router = express.Router()

router.post("/addBlog", isAuth, upload.single("image"), createBlog)
router.get("/getall", getallBlog)
router.get("/get/:id", isAuth, getbyId)
router.put("/update/:id",isAuth, update)
router.delete("/delete/:id", isAuth, deleteBlog)

module.exports = router