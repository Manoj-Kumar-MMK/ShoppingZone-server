const mongoose = require("mongoose")

const Schema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	products: {
		type: [
			{
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
				count: {
					type: Number,
					required: true,
				},
			},
		],
	},
	amount: {
		type: Number,
		required: true,
	},
	address: { type: String, required: true },
})

module.exports = mongoose.model("Order", Schema)
