const Cart = require("../../models/cart_model");
const addToCart = async(req, res) => {

        const { userId, productId, count } = req.body;

        const cart = await Cart.create({
        user:userId,
        products: [{
            product: productId,
          quantity: count
            }],
            total:0
        });
         
       console.log(cart)

       return res.status(201).json({
        message:"product added successfully",
        cart
       });

    }

module.exports = addToCart;