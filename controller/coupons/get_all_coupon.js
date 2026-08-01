const responseToFront = require("../../helper/responseToFront")
const couponSchema = require("../../models/coupon.model")

const getAllCoupons = async (req, res) => {
    try {
        const coupons = await couponSchema.find({})
        res.status(200).json(responseToFront('done' , 200 , coupons))
    } catch (error) {
        res.status(500).json(responseToFront(error.message, 500))
    }
}
module.exports = getAllCoupons