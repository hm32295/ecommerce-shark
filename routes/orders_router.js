const express = require("express");
const orderRouter = express.Router();
const createOrder = require("../controller/order/create_order")
const getMyOrder = require("../controller/order/get_my_orders")
const getAllOrder = require("../controller/order/get_all_orders")


router.get("/getAllOrders", getAllOrder)
router.get("/getMyOrder", getMyOrder)
router.post("/order", createOrder)

module.exports=orderRouter;