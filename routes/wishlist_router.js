const createWishList = require('../controller/wishlist/create_wishlist');
const deleteWishlist = require('../controller/wishlist/delete_wishlist');
const getAllWishlist = require('../controller/wishlist/get_all_wishlist');
const updateWishlist = require('../controller/wishlist/update_wishlist');

const wishListRouter = require('express').Router();

wishListRouter.post('/' ,createWishList)
wishListRouter.get('/:userId' ,getAllWishlist)
wishListRouter.delete('/:id' ,deleteWishlist)
wishListRouter.put('/:id' ,updateWishlist)

module.exports = wishListRouter