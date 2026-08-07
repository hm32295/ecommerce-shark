const orderSchema = require("../../models/order_model")
const getMyOrder =async(req , res)=>{
try {
    
    const {userId}= req.body;
// from req.user احضر الuser id  
 //عشان  استخدم الايدي بتاع اليوزر في البحث عن الاوردر الخاث باليوزر
//ده بعدين لما نعمل ميدل وير للصلاحيات
//const userId = req.user._id
const all =await orderSchema.find({
    user:userId
}).populate("products.product")


 res.status(200).json({
      massege:"your order is here",
      all,
    });


console.log(all);
} catch (e) {

    console.log(e);
    
}

} 
module.exports=getMyOrder