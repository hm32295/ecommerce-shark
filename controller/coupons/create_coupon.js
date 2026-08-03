const responseToFront = require('../../helper/responseToFront');
const couponSchema = require('../../models/coupon.model')

const addCoupon = async (req, res) => {
    const { code,discount, expireDate,  usageLimit } = req.body;
    if (!code || !discount || !expireDate) {
        return res.status(400).json(
            responseToFront("All required fields must be provided", 400)
        );
    }
    try {

        const couponExists = await couponSchema.findOne({ code: code.toUpperCase() });

        if (couponExists)  return res.status(409).json( responseToFront("Coupon code already exists", 409))

        const coupon = await couponSchema.create({ code, discount,expireDate, usageLimit });

        return res.status(201).json( responseToFront("Coupon created successfully", 201, coupon)  );

    } catch (error) {

        return res.status(500).json(
            responseToFront(error.message, 500)
        );

    }
};

module.exports = addCoupon;