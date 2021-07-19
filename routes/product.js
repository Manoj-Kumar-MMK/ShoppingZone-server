const router = require("express").Router()

const auth = require("../middlewares/auth")
const imageUpload = require("../middlewares/imageUpload")
const { createProduct, getProductDetails } = require("../controllers/product")

//VENDOR AUTH
router.post("/create", auth("vendor"), imageUpload, createProduct)
router.get("/details/:pid", auth("user"), getProductDetails)

module.exports = router
