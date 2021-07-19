const mongoose = require("mongoose")

const Product = require("../models/product")
const Order = require("../models/order")
const Vendor = require("../models/vendor")
const User = require("../models/user")

const placeOrder = async (req, res) => {
	try {
		const { items, address } = req.body
		const id = req.meta
		let amount = 0
		const user = await User.findById(id)
		if (!user) return res.status(400).json({ error: "User not found" })

		const session = await mongoose.startSession()
		try {
			session.startTransaction()

			await Promise.all(
				items.map(async (item) => {
					const product = await Product.findById(item._id)
					if (product.stock < item.count) throw Error("Out of Stock")

					product.stock -= item.count
					await product.save({ session })
					amount += product.price * item.count
				})
			)
			const order = new Order({
				user: id,
				products: items,
				amount,
				address,
			})
			await order.save({ session })

			user.orders.push(order)
			await user.save({ session })
		} catch (err) {
			await session.abortTransaction()
			session.endSession()
			console.log(err)
			return res.status(400).json({ err })
		}
		await session.commitTransaction()
		session.endSession()
		res.status(201).json({ message: "Order placed Succesfully" })
	} catch (err) {
		console.log(err)
		res.status(400).json(err)
	}
}

const getUserOrders = async (req, res) => {
	const id = req.meta
	const orders = await User.findById(id, "orders").populate("orders")
	res.status(200).json(orders)
}
module.exports = { placeOrder, getUserOrders }
