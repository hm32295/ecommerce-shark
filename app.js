
require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

const mongoose= require("mongoose");
const cookieParser = require("cookie-parser");
const routerCategory = require("./routes/categories_router");
const routerProduct = require("./routes/products_router");
const couponRouter = require("./routes/coupon_router");
const routerUsers = require("./routes/users_router");


const Router = require("./routes/orders_router")
const PORT=process.env.PORT;
const DB=process.env.DB_URL;
const auth_router=require("./routes/auth_router");
const wishListRouter = require('./routes/wishlist_router');
const routerDashboard = require('./routes/dashboard');
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(express.json());


app.use(cookieParser());

app.use('/api/v1/users', routerUsers)
app.use('/api/v1/category' , routerCategory)
app.use('/api/v1/product', routerProduct)
app.use("/api/v1/coupons", couponRouter);
app.use("/api/v1/auth", auth_router);
app.use("/api/v1/dashboard", routerDashboard);
app.use("/api/v1/wish_list", wishListRouter);

mongoose.connect(DB).then(()=>{
    console.log("congratulations DB connected");
}).catch((e)=>{
    console.log(`sorry DB can not be connected ${e.message}`);
    process.exit(1)
})

app.use('/api/v1/order', Router)

app.get("/",(req,res)=>{
    res.json({
        msg:"hello"
    })
})

// module.exports = app
app.listen(3000)



