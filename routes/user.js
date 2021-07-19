const router = require("express").Router()

const { signup, login } = require("../controllers/user")

// NO AUTH
router.post("/signup", /* validate(signupSchema) */ signup)
router.post("/login", /* validate(loginSchema) */ login)

module.exports = router
