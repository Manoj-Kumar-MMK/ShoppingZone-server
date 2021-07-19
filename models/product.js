const mongoose = require("mongoose")

const Schema = mongoose.Schema({
	name: { type: String, required: true },
	vendor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Vendor",
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Category",
	},
	image: { type: String, required: true },
	description: { type: String, required: true },
	weight: { type: Number, required: true },
	stock: { type: Number, required: true },
	soldQuantity: { type: Number, default: 0 },
	price: { type: Number, required: true },
})

module.exports = mongoose.model("Product", Schema)
