const express = require("express");
const mongoose= require("mongoose");
const app = express();
const cors = require('cors')
require('dotenv').config();
const Router = require("./routes/orders_router")
const PORT=process.env.PORT;
const DB=process.env.DB_URL;

app.use(express.json());

mongoose.connect(DB).then(()=>{
    console.log("congratulations DB connected");
}).catch((e)=>{
    console.log(`sorry DB cann,t be connected ${e.message}`);
    process.exit(1)
})
app.use(cors())
app.use('/api', Router)

app.listen(PORT,()=>{
    console.log(`----Server Running ${PORT} `);
})




