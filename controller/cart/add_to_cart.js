const Cart = require("../../models/cart_model");
const addToCart = async(req, res) => {

        const { userId, productId, count } = req.body;

        const cart = await Cart.create({
        userId,
        products: [{
            productId,
            count,
            }],
            total:0
        });
         
       console.log(cart)

       return res.status(201).json({
        message:"product added successfully"
       });

    }

module.exports = addToCart;