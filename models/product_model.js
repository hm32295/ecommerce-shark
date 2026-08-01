const mongoose= require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const product_model= mongoose.Schema({
    title:{
        type:String,
        required:true, 
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        default:0,
        min:0
    },
    stock:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:ObjectId,
        ref:"Categories",
        required:true
    },
    brand:{
        type:String,
        trim:true
    },
    image:{
        type:String
    },
    reviews:[
        {
        user:{
            type:ObjectId,
            ref:"Users",
            required:true
        },
        comment:{
            type:String,
            required:true,
            trim:true
            },
            rating: {
                type:Number,
                default:0,
                min:0,
                max:5
                
            }
        }],
        rating:{
            type:Number,
            default:0,
            min:0,
            max:5
    },
},{timestamps:true},
);

module.exports= new mongoose.model("Products",product_model)