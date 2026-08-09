const express = require("express");
const router = express.Router();

const { createPayment } = require("../controller/payments/create_payment");

router.post("/create", createPayment);

module.exports = router;
