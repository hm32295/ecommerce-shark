const orderSchema = require("../../models/order_model")
const getAllOrder =async(req , res)=>{
try {
    
   
const allOrder =await orderSchema.find({
    
}).populate("products.product")


 res.status(200).json({
      massege:"your order is here",
      allOrder,
    });


console.log(all);
} catch (e) {

    console.log(e);
    
}

} 
module.exports=getAllOrder