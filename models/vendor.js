const mongoose = require("mongoose")

const Schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	mobile: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	products: {
		type: [
			{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
		],
	},
})

module.exports = mongoose.model("Vendor", Schema)
