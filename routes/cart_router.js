const express = require("express");

const cartRoute = express.Router();

const addToCart = require("../controller/cart/add_to_cart")
cartRoute.post("/addtocart", addToCart);

module.exports = cartRoute;