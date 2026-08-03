const responseToFront = require('../../helper/responseToFront');
const couponSchema = require('../../models/coupon.model');

const deleteCoupon = async (req, res) => {
    const _id  = req.params.id;

    try {
        const deletedCoupon = await couponSchema.findByIdAndDelete(_id);

        if (!deletedCoupon) {
            return res
                .status(404)
                .json(responseToFront("Coupon not found", 404));
        }

        return res
            .status(200)
            .json(responseToFront("Coupon deleted successfully", 200, deletedCoupon));

    } catch (error) {
        return res
            .status(500)
            .json(responseToFront(error.message, 500));
    }
};

module.exports = deleteCoupon;