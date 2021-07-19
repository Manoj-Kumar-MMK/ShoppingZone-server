const mongoose = require("mongoose")

const Schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		required: true,
	},
	products: {
		type: [
			{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
		],
	},
})

module.exports = mongoose.model("Category", Schema)
