const routerProduct = require('express').Router()
const addReview = require('../controller/products/add_review');
const deleteProduct = require('../controller/products/delete_product');
const deleteReview = require('../controller/products/delete_review');
const getSingleProduct = require('../controller/products/get_by_id_product');
const getProduct = require('../controller/products/get_product');
const getReviews = require('../controller/products/get_review');
const editProduct = require('../controller/products/update_product');
const updateReview = require('../controller/products/update_review');
const createProduct = require('../controller/products/upload_product');
const check_role = require('../middlewares/check_role');
const is_login_middleware = require('../middlewares/is_login');
const upload = require('../middlewares/multer');


routerProduct.post('/' ,is_login_middleware,check_role,createProduct)

routerProduct.get('/' ,getProduct)
routerProduct.get('/:id' ,getSingleProduct)
routerProduct.put('/:id' ,is_login_middleware,check_role,editProduct)
routerProduct.delete('/:id',is_login_middleware,check_role, deleteProduct)


routerProduct.get("/:productId/reviews", getReviews);
routerProduct.post("/:productId/reviews", addReview);
routerProduct.delete("/:productId/reviews/:reviewId", deleteReview);
routerProduct.put( "/:productId/reviews/:reviewId",updateReview);
 
module.exports = routerProduct