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
	orders: {
		type: [
			{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Order" },
		],
	},
})

module.exports = mongoose.model("User", Schema)
