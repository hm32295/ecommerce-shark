const mongoose=require("mongoose");

const ObjectId=mongoose.Schema.Types.ObjectId;

const cart_model=mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"Users",
        required:true
    },
    products:[{
        
        product:{

            type:ObjectId,
            ref:"Products",
            required:true,
        },
        quantity:{

            type:Number,
            required:true,
            default:1,
            min:1
        }
    }],
});

module.exports= new mongoose.model("carts",cart_model)