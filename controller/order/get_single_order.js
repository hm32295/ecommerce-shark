const orderSchema = require("../../models/order_model")
const getSingleOrder =async(req , res)=>{
try {
    
    const {orderId}= req.body;
// هو مش هايتبعت هنا هايتبعت كا برامز بس ده عشان نجربها بس
const single =await orderSchema.findOne({
   _id:orderId
})

console.log(single);

 res.status(200).json({
      massege:"your order is here",
      single,
    });


console.log(single);
} catch (e) {

    console.log(e);
    
}

} 
module.exports=getSingleOrder