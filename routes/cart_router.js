const express = require("express");
const router = express.Router();

const { addToCart } = require("../controller/cart/add_to_cart");
const { getCart } = require("../controller/cart/get_my_cart");
const { updateCart } = require("../controller/cart/update_my_cart");
const { removeFromCart } = require("../controller/cart/remove_from_cart");
const { clearCart } = require("../controller/cart/clear_cart");

router.post("/add", addToCart);
router.get("/", getCart);
router.put("/update/:id", updateCart);
router.delete("/remove/:id", removeFromCart);
router.delete("/clear", clearCart);

module.exports = router;