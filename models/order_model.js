const mongoose=require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId;

const order_model=mongoose.Schema({
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
        },
        price:{
            type:Number,
            required:true,
            min:0
        }
    }],
    totalPrice:{
        type:Number,
        default:0,
        min:0,
        required:true
    },
    shippingAddress:{
        address:{
        city:{
            type:String,
            required:true
        },
        area:{
            type:String,
            required:true
        },
        street:{
            type:String,
            required:true
        },
        building:{
            type:String,
            required:true
        },
        floor:{
            type:String,
            required:true
        },
        apartment:{
            type:String,
            required:true
        }
    },

    },
    paymentMethod:{
        type:String,
        enum:["cash on delivery","paymob"],
        required:true
    },
    paymentTraking:{
        type:String,
        enum:["pending","payed","failed process"],
        default:"pending"
    },
    orderTraking:{
        status:{
            type:String,
            enum:[
                "Pending",
                "Confirmed",
                "Packed",
                "Dispatched",
                "Out For Delivery",
                "Dilevered",
                "cancelled"
            ],
            default:"Pending"
        },
        updatedAt: {
        type: Date,
        default: Date.now,
        },
    },

},{timestamps:true})

module.exports= new mongoose.model("Orders",order_model) 