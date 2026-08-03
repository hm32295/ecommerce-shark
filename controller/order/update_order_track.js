const orderSchema = require("../../models/order_model")

const updateOrderTrack = async(req ,res)=>{

try {
const {orderId , newStatus}= req.body;

const orders =await orderSchema.findOne({
_id:orderId
})
  console.log(orders);
console.log(newStatus);

  orders.status = newStatus
  await orders.save();

  res.status(200).json({
      massege:"your order status has changed",
      orders,
    });
  

    
} catch (e) {
    console.log(e);
    
}



}

module.exports = updateOrderTrack 