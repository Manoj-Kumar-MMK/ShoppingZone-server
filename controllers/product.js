const mongoose = require("mongoose")

const Product = require("../models/product")
const Category = require("../models/category")
const Vendor = require("../models/vendor")

const createProduct = async (req, res) => {
	try {
		const { name, cat, description, price, stock, weight } = req.body
		const id = req.meta
		const { image } = req

		const vendor = await Vendor.findById(id)
		if (!vendor) return res.status(400).json({ error: "Vendor not found" })
		const category = await Category.findOne({ name: cat })
		if (!category) return res.status(400).json({ error: "Category not found" })

		const session = await mongoose.startSession()
		try {
			session.startTransaction()

			const product = new Product({
				name,
				description,
				price,
				stock,
				weight,
				image: image,
			})
			product.category = category._id
			product.vendor = vendor._id
			console.log(product)
			await product.save({ session })

			category.products.push(product._id)
			vendor.products.push(product._id)
			console.log(vendor)
			console.log(category)

			await category.save({ session })
			await vendor.save({ session })
		} catch (err) {
			await session.abortTransaction()
			session.endSession()
			console.log(err)
			return res.status(400).json({ error: "Error creating the product" })
		}
		await session.commitTransaction()
		session.endSession()
		res.status(201).json({ message: "Product created Succesfully" })
	} catch (err) {
		res.status(400).json(err)
	}
}

const getProductDetails = async (req, res) => {
	const product = await Product.findById(req.params.pid)
	if (!product) return res.status(400).json({ error: "Product not found" })

	res.status(200).json(product)
}

module.exports = { createProduct, getProductDetails }
