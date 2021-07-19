const axios = require("axios")
require("dotenv").config()

const imageUpload = async (req, res, next) => {
	try {
		const result = await axios.post(process.env.IMAGE_URL, {
			file: req.body.image,
			upload_preset: process.env.IMAGE_PRESET,
		})
		req.image = result.data.url
		delete req.body["image"]
	} catch (err) {
		return res.status(400).json({ error: "Error uploading the image" })
	}
	next()
}

module.exports = imageUpload
