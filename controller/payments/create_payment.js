const Order = require("../../models/order_model");
const User = require("../../models/users_model");
const axios = require("axios");

exports.createPayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        if (order.user.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You are not allowed to pay for this order"
            });
        }
        if (order.paymentMethod !== "paymob") {
            return res.status(400).json({
                message: "This order does not use Paymob"
            });
        }
        if (order.paymentTraking === "payed") {
            return res.status(400).json({
                message: "Order is already paid"
            });
        }
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const amount = order.totalPrice;
        const currency = "EGP";

        const response = await axios.post(
            PAYMOB_ENDPOINT,
            {
                // payment intention data
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYMOB_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message 
        });
    }
};    