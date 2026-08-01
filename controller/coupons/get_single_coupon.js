const responseToFront = require("../../helper/responseToFront")
const couponSchema = require("../../models/coupon.model")

const getSingleCoupons = async (req, res) => {
    const _id= req.params.id
    try {
        const coupon = await couponSchema.findById(_id)
        if (coupon) return res.status(200).json(responseToFront('done', 200, coupon))
        res.status(404).json(responseToFront('this coupon is not defined'))
    } catch (error) {
        res.status(500).json(responseToFront(error.message, 500))
    }
}
module.exports = getSingleCoupons