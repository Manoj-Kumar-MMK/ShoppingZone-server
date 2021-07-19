const router = require("express").Router()

const imageUpload = require("../middlewares/imageUpload")
const {
	create,
	getCategories,
	getCategoryProducts,
} = require("../controllers/category")

router.post("/create", imageUpload, create)
router.get("/", getCategories)
router.get("/products/:cid", getCategoryProducts)

module.exports = router
