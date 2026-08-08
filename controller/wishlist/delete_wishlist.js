const responseToFront = require("../../helper/responseToFront");
const wishListModel = require("../../models/wishList.model");


const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const wishlist = await wishListModel.findByIdAndDelete(id);

    if (!wishlist) {
      return res.status(404).json(responseToFront('Wishlist not found' ,404));
    }
    res.status(200).json(responseToFront("Wishlist deleted successfully", 200 ));
  } catch (error) {
    res.status(500).json(responseToFront(error.message,500 ));
  }
};

module.exports = deleteWishlist
