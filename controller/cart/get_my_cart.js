const Cart = require("../../models/cart_model");
exports.getCart = async (req, res) => {
    
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found"
        });
    }
    await cart.populate("products.product");
    
    return res.status(200).json({
        message: "Cart retrieved successfully",
        cart: cart
    });
};