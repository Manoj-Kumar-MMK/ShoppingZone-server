const mongoose = require("mongoose")

const Category = require("../models/category")

const create = (req, res) => {
	try {
		const { name } = req.body
		const { image } = req
		const category = new Category({ name, image })
		category.save()

		res.status(201).json({ message: "Category created Succesfully" })
	} catch (err) {
		res.status(400).json(err)
	}
}

const getCategories = async (req, res) => {
	const categories = await Category.find({}, "-products")
	res.status(200).json(categories)
}

const getCategoryProducts = async (req, res) => {
	try {
		const id = req.params.cid
		const products = await Category.findById(id, "products").populate(
			"products"
		)
		res.status(200).json(products)
	} catch (err) {
		res.status(400).json(err)
	}
}

module.exports = { create, getCategories, getCategoryProducts }
