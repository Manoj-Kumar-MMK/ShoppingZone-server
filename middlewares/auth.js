require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (role) => (req, res, next) => {
	//get token from header
	const token = req.headers.authorization?.split(" ")[1]
	if (!token) return res.status(400).json({ error: "Token not found" })

	//verify token and add metadata
	const key = role === "user" ? process.env.JWT_KEY_1 : process.env.JWT_KEY_2
	const extract = jwt.verify(token, key)
	req.meta = extract.id
	next()
}
