const responseToFront = require("../../helper/responseToFront");
const wishlistSchema = require('../../models/wishList.model')
const createWishList = async (req, res) => {
    const { productId, userId } = req.body;

    if(!userId || !productId) return res.status(404).json(responseToFront('please enter all data', 404))
    try {
            const wishlist = await wishlistSchema.findOne({ userId });

            if (!wishlist) {
            const newWishlist = await wishlistSchema.create({
                userId,
                products: [productId],
            });

            return res.status(201).json(responseToFront('created product successfully',201,newWishlist))
        }
        
        if (wishlist.products.includes(productId)) {
                return res.status(400).json(responseToFront('Product already exists in wishlist',400))
            }
            wishlist.products.push(productId);
            await wishlist.save();

            return res.status(201).json(responseToFront('created product successfully',201,wishlist))
         
    } catch (error) {
        res.status(500).json(responseToFront(error.message ,500))
    }
}
module.exports =createWishList