const orderSchema = require("../../models/order_model")
const CancelOrder =async(req , res)=>{
try {
    
    const {orderId}= req.body;
// هو مش هايتبعت هنا هايتبعت كا برامز بس ده عشان نجربها بس
const order =await orderSchema.findOne({
   _id:orderId
})

console.log(order);
if (order.status === "Pending") {
    order.status = "Cancelled"
    await order.save();
}
 res.status(200).json({
      massege:"your order is here",
      order,
    });


console.log(order);
} catch (e) {

    console.log(e);
    
}

} 
module.exports=CancelOrder