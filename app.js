const express = require("express");
const mongoose= require("mongoose");
const routerCategory = require("./routes/categories_router");
const routerProduct = require("./routes/products_router");
const couponRouter = require("./routes/coupon_router");
const app = express();

require('dotenv').config();

const PORT=process.env.PORT;
const DB=process.env.DB_URL;

app.use(express.json());



app.use('/api/category' , routerCategory)
app.use('/api/product', routerProduct)
app.use("/api/coupons", couponRouter);
mongoose.connect(DB).then(()=>{
    console.log("congratulations DB connected");
}).catch((e)=>{
    console.log(`sorry DB can not be connected ${e.message}`);
    process.exit(1)
})

app.listen(PORT,()=>{
    console.log(`----Server Running ${PORT} `);
})




