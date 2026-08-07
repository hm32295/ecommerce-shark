const Cart = require("../../models/cart_model");
const removeFromCart = async ( req, res) => {
    const { userId} = req.body;
    const {id} = req.params;
    const cart = await Cart.findOne({userId});
    if (!cart){
        return res.status(404).json({
            message:"Cart not found"
        });
    }
    cart.products = cart.products.filter(
        (item) => item.productId.toString() !== id
    );
    await cart.save();
    return res.status(200).json({
        message:"product removed successfully"
    });

};
module.exports = removeFromCart;