const responseToFront = require("../../helper/responseToFront");
const wishListModel = require("../../models/wishList.model");


const updateWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;

    const wishlist = await wishListModel.findById(id);


    if (!wishlist) {
      return res.status(404).json(responseToFront('Wishlist not found' ,404));
    }
    
    const productIndex = wishlist.products.findIndex(
        (product) => product.toString() === productId.toString()
    );
    
    if (productIndex !== -1) {
      wishlist.products.splice(productIndex, 1);
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    const updatedWishlist = await wishListModel.findById(id)
      .populate("userId")
      .populate("products");

      res.status(200).json(responseToFront(
          productIndex !== -1 ? "Product removed from wishlist" : "Product added to wishlist",
          200,updatedWishlist,));
  } catch (error) {

      res.status(500).json(responseToFront(error.message ,500));
  }
};

module.exports =   updateWishlist