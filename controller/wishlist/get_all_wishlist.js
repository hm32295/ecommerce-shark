const responseToFront = require("../../helper/responseToFront")
const wishListModel = require("../../models/wishList.model")

const getAllWishlist = async (req, res) => {
    const {userId} = req.params
    try {   
        const response = await wishListModel.find({userId}, 'userId products')
            .populate('userId', 'name email')
            .populate('products')
        return res.status(200).json(responseToFront('done', 200 ,response))
    } catch (error) {
        res.status(500).json(responseToFront(error.message ,500))
    }
}

module.exports = getAllWishlist