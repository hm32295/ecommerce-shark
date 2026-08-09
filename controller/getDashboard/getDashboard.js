const responseToFront = require("../../helper/responseToFront")
const categories_model = require("../../models/categories_model")
const couponModel = require("../../models/coupon.model")
const order_model = require("../../models/order_model")
const product_model = require("../../models/product_model")
const users_model = require("../../models/users_model")

const getDashboard = async (req, res) => {
    try {
        const productCount = await product_model.find({}).countDocuments()
        const usersCount = await users_model.find({}).countDocuments()
        const orderCount = await order_model.find({}).countDocuments()
        const couponCount = await couponModel.find({}).countDocuments()
        const categoryCount = await categories_model.find({}).countDocuments()

        res.status(200).json(responseToFront('done', 200,
            { productCount, usersCount, orderCount, couponCount, categoryCount }))
    } catch (error) {
        res.status(500).json(responseToFront(error.message ,500))
    }
}

module.exports =getDashboard