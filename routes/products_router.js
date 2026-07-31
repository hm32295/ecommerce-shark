const routerProduct = require('express').Router()
const deleteProduct = require('../controller/products/delete_product');
const getSingleProduct = require('../controller/products/get_by_id_product');
const getProduct = require('../controller/products/get_product');
const editProduct = require('../controller/products/update_product');
const createProduct = require('../controller/products/upload_product');


routerProduct.post('/' ,createProduct)
routerProduct.get('/' ,getProduct)
routerProduct.get('/:id' ,getSingleProduct)
routerProduct.put('/:id' ,editProduct)
routerProduct.delete('/:id' ,deleteProduct)

module.exports = routerProduct