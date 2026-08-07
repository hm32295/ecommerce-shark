const express = require("express");
const mongoose= require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routerCategory = require("./routes/categories_router");
const routerProduct = require("./routes/products_router");
const couponRouter = require("./routes/coupon_router");
const routerUsers = require("./routes/users_router");
require('dotenv').config();

const app = express();

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}));


const PORT=process.env.PORT;
const DB=process.env.DB_URL;
const auth_router=require("./routes/auth_router");

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', routerUsers)
app.use('/api/v1/category' , routerCategory)
app.use('/api/v1/product', routerProduct)
app.use("/api/v1/coupons", couponRouter);
app.use("/api/v1/auth", auth_router);

mongoose.connect(DB).then(()=>{
    console.log("congratulations DB connected");
}).catch((e)=>{
    console.log(`sorry DB can not be connected ${e.message}`);
    process.exit(1)
})

app.get("/",(req,res)=>{
    res.json({
        msg:"hello"
    })
})

app.listen(PORT,()=>{
    console.log(`----Server Running ${PORT} `);
})




