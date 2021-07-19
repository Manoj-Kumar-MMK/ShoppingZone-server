require("dotenv").config()
const mongoose = require("mongoose")
const crypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//Models
const User = require("../models/user")

// @method ---  POST
// @header ---
// @body   ---  name,email,mobile,password
const signup = async (req, res, next) => {
	try {
		//check email exists
		const { name, email, mobile, password } = req.body
		const exist = await User.findOne({ email })
		if (exist) return res.status(400).json({ error: "Email already exists" })

		//hash passsword and save
		const hash = await crypt.hash(password, 10)
		const user = new User({
			name,
			email,
			mobile,
			password: hash.toString(),
		})
		user.save()

		//jwt-sign
		const token = jwt.sign({ id: user._id, email }, process.env.JWT_KEY_1, {
			expiresIn: "24hrs",
		})
		if (token) res.status(201).json({ token })
		else
			res.status(500).json({
				error: "User Created,token creation error,try logging in again",
			})
	} catch (err) {
		next(err)
	}
}

// @method ---  POST
// @header ---
// @body   --- email,password
const login = async (req, res, next) => {
	try {
		//check email exists
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user)
			return res.status(400).json({ error: "No user found for this email" })

		//validate password
		const isValid = await crypt.compare(password, user.password)
		if (!isValid) return res.status(400).json({ error: "Password is wrong" })

		//jwt-sign
		const token = jwt.sign({ id: user._id, email }, process.env.JWT_KEY_1)
		if (token) res.status(200).json({ token })
		else res.status(500).json({ error: "Error Creating token" })
	} catch (err) {
		next(err)
	}
}

module.exports = { login, signup }
