
const mongoose=require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const wishListSchema=mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:"Users",
        required:true,

    },
    products: [
        {
            type:ObjectId,
            ref:"Products",
            required:true
        },
    ]},

{timestamps:true}
);


module.exports=new mongoose.model("Wishlist",wishListSchema)
