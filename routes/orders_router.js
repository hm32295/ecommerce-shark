const express = require("express");
const Router = express.Router();
const createOrder = require("../controller/order/create_order")
const getMyOrder = require("../controller/order/get_my_orders")
const getAllOrder = require("../controller/order/get_all_orders")
const getSingleOrder = require("../controller/order/get_single_order")


Router.get("/getSingleOrder", getSingleOrder)
Router.get("/getAllOrders", getAllOrder)
Router.get("/getMyOrder", getMyOrder)
Router.post("/", createOrder)

module.exports=Router;