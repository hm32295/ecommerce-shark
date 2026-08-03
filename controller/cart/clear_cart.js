const Cart = require("../../models/cart_model");
exports.clearCart = async (req, res) => {
    //Authentication
    const userId = req.user.id; 
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found"
        });
    }
    // Clear the cart items
    cart.products = [];
    await cart.save();

    return res.status(200).json({
        message: "Cart cleared successfully"
    });
};