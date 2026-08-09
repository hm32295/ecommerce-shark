const Order = require("../../models/order_model");
const User = require("../../models/users_model");
const axios = require("axios");

exports.createPayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.body;

        // Find the order
        const order = await Order.findById(orderId)
            .populate("products.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // Check order ownership
        if (order.user.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You are not allowed to pay for this order"
            });
        }

        // Check payment method
        if (order.paymentMethod !== "paymob") {
            return res.status(400).json({
                message: "This order does not use Paymob"
            });
        }

        // Check if already paid
        if (order.paymentTraking === "payed") {
            return res.status(400).json({
                message: "Order is already paid"
            });
        }

        // Find user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Prepare Paymob items
        const items = order.products.map(item => ({
            name: item.product.title,
            amount: Math.round(item.price * 100),
            description: item.product.description,
            quantity: item.quantity
        }));

        // Prepare billing data
        const billingData = {
            first_name: user.name,
            last_name: "Customer",
            email: user.email,
            phone_number: user.phone,
            apartment: "NA",
            floor: "NA",
            street: user.adress.street,
            state: user.adress.area,
            city: user.adress.city,
            shipping_method: "NA",
            postal_code: "NA",
            country: "EG"
            
        };

        // Create payment intention
        const response = await axios.post(
            `${process.env.PAYMOB_BASE_URL}/v1/intention/`,
            {
                amount: Math.round(order.totalPrice * 100),
                currency: "EGP",

                payment_methods: [
                    Number(process.env.PAYMOB_INTEGRATION_ID)
                ],

                items: items,

                billing_data: billingData,

                special_reference: order._id.toString()
            },
            {
                headers: {
                    Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return res.status(200).json({
            message: "Payment intention created successfully",
            clientSecret: response.data.client_secret
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Payment creation failed",
            error: error.message
        });
    }
};