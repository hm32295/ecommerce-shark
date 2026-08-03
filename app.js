const express = require("express");
const mongoose= require("mongoose");
const app = express();

require('dotenv').config();

const PORT=process.env.PORT;
const DB=process.env.DB_URL;
const auth_router=require("./routes/auth_router");

app.use(express.json());

mongoose.connect(DB).then(()=>{
    console.log("congratulations DB connected");
}).catch((e)=>{
    console.log(`sorry DB cann,t be connected ${e.message}`);
    process.exit(1)
})

app.use("/api/v1/auth",auth_router);

app.get("/",(req,res)=>{
    res.json({
        msg:"hello"
    })
})

app.listen(PORT,()=>{
    console.log(`----Server Running ${PORT} `);
})




