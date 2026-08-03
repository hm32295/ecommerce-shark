const Cart = require("../../models/cart_model");
const Product = require("../../models/product_model");
exports.updateCart = async (req, res) => {
    
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({
            message: "Product ID and quantity are required"
        });
    }
    if (quantity < 1) {
        return res.status(400).json({
            message: "Quantity must be greater than 0"
        });
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found"
        });
    }
    const cartItem = cart.products.find(item =>
    item.product.equals(productId)
    );
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }
    if (!cartItem) {
        return res.status(404).json({
            message: "Product not found in cart"
        });
    }
    if (quantity > product.stock) {
        return res.status(400).json({
            message: "Insufficient stock"
        });
    }
    cartItem.quantity = quantity;
    await cart.save();
    return res.status(200).json({
        message: "Cart updated successfully",
        cart: cart
    });
};