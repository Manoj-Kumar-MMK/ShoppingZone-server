const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan("dev"))
app.use(express.json({ limit: "10mb" }))
app.use(cors())

//
app.disable("etag")

const userRouter = require("./routes/user")
const vendorRouter = require("./routes/vendor")
const categoryRouter = require("./routes/category")
const productRouter = require("./routes/product")
const orderRouter = require("./routes/order")

app.use("/api/user", userRouter)
app.use("/api/vendor", vendorRouter)
app.use("/api/category", categoryRouter)
app.use("/api/product", productRouter)
app.use("/api/order", orderRouter)

app.use((req, res, next) => {
	const error = new Error("Not found")
	error.status = 404
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: error.message || "Internal Server Error",
	})
})

app.listen(PORT, () => console.log(`SERVER STARTED AT----${PORT}`))

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", () => console.log("Db connection error"))
db.once("open", () => console.log("Connected to  database---"))
