const express = require("express");
const mongoose= require("mongoose");
const routerCategory = require("./routes/categories_router");
const routerProduct = require("./routes/products_router");
const couponRouter = require("./routes/coupon_router");
const routerUsers = require("./routes/users_router");
require('dotenv').config();
const app = express();



const PORT=process.env.PORT;
const DB=process.env.DB_URL;
const auth_router=require("./routes/auth_router");

app.use(express.json());



app.use('/api/users', routerUsers)

app.use('/api/category' , routerCategory)
app.use('/api/product', routerProduct)
app.use("/api/coupons", couponRouter);
mongoose.connect(DB).then(()=>{
    console.log("congratulations DB connected");
}).catch((e)=>{
    console.log(`sorry DB can not be connected ${e.message}`);
    process.exit(1)
})

app.use("/api/v1/auth",auth_router);

app.get("/api/v1",(req,res)=>{
    res.json({
        msg:"hello"
    })
})

app.listen(PORT,()=>{
    console.log(`----Server Running ${PORT} `);
})




