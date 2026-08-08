const express = require("express");
const mongoose= require("mongoose");
const axios = require("axios");
const app = express();

require('dotenv').config();

const PORT=process.env.PORT || 3000;
const DB=process.env.DB_URL;

app.use(express.json());

mongoose.connect(DB).then(()=>{
    console.log("congratulations DB connected");
}).catch((e)=>{
    console.log(`sorry DB cann't be connected ${e.message}`);
    process.exit(1)
})

const cartRoutes = require("./routes/cart_router");

app.use("/cart", cartRoutes);

app.listen(PORT,()=>{
    console.log(`----Server Running ${PORT} `);
})


