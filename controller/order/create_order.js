const orderSchema= require("../../models/order_model")
const cartSchema = require("../../models/cart_model")

const createOrder= async(req , res)=>{

try {
       const userId = req.user.id;
const {paymentMethod , shippingAddress }=req.body;
const userCart =await cartSchema.findOne({
    user: userId
}).populate("products.product")

console.log(userCart);

if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({
            message: "Cart is Empty please add to continued"
        })
}
 const sortOfCart = userCart.products.map((item)=>{
    return {
        product:item.product._id,
        quantity:item.quantity,
        price:item.product.price
    }
 } )

 const totalPrice= userCart.products.reduce((total , item)=>{
   return total +item.product.price *item.quantity
 },0);

 const order=await orderSchema.create({
    user:userId,
    products: sortOfCart,
    totalPrice,
    paymentMethod,
    shippingAddress
 
 })
 userCart.products=[];
 await userCart.save();
 return res.status(201).json({
            message: "order created successfully"
        })


    } catch (e) {
    console.log(e);
    
}
}
module.exports=createOrder;