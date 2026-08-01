const responseToFront = require("../../helper/responseToFront");
const couponSchema = require('../../models/coupon.model');

const updateCoupon = async (req, res) => {
    const  _id  = req.params.id;

    const {
        code,
        discount,
        expireDate,
        isActive,
        usageLimit
    } = req.body;

    try {
        const coupon = await couponSchema.findById(_id);

        if (!coupon) {
            return res
                .status(404)
                .json(responseToFront("Coupon not found", 404));
        }

        
        if (code !== undefined) {
            coupon.code = code;
        }

        if (discount !== undefined) {
            coupon.discount = discount;
        }

        if (expireDate !== undefined) {
            coupon.expireDate = expireDate;
        }

        if (isActive !== undefined) {
            coupon.isActive = isActive;
        }

        if (usageLimit !== undefined) {
            coupon.usageLimit = usageLimit;
        }

        await coupon.save();

        return res
            .status(200)
            .json(
                responseToFront(
                    "Coupon updated successfully",
                    200,
                    coupon
                )
            );

    } catch (error) {
        return res
            .status(500)
            .json(responseToFront(error.message, 500));
    }
};

module.exports = updateCoupon;