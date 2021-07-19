const router = require("express").Router()

const auth = require("../middlewares/auth")
const { placeOrder, getUserOrders } = require("../controllers/order")

//USER AUTH
router.post("/place", auth("user"), placeOrder)
router.get("/user", auth("user"), getUserOrders)

module.exports = router
