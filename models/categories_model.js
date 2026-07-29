const mongoose=require("mongoose");

const category_model=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    description:{
        type:String
    },

},{timestamps:true}
);


module.exports=new mongoose.model("Categories",category_model)