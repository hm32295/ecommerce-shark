const orderSchema = require("../../models/order_model")
const getUserOrders =async(req , res)=>{
try {
    
    const {userId}= req.body;

const userOrder =await orderSchema.find({
    user:userId
}).populate("products.product")


 res.status(200).json({
      massege:"your order is here",
      userOrder,
    });


console.log(userOrder);
} catch (e) {

    console.log(e);
    
}

} 
module.exports=getUserOrders