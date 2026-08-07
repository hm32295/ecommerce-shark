const mongoose=require("mongoose");
const user_model =mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    newEmail:{
        type:String,
    },
    newEmailVerificationCode:{
        type:String
    },
    newEmailVerificationCodeExpiration:{
    type: Date
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    secondaryPhone:{
        type:String
    },
    adress:{
        city:{
            type:String
        },
        area:{
            type:String
        },
        street:{
            type:String
        }
    },
    inactive:{
        type:Boolean,
        default:false
    },
    isBlocked: {
    type: Boolean,
    default: false,
},
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    image:{
        type:String,
    },
    isVerified: {
    type: Boolean,
    default: false
    },

    verificationCode: {
    type: String
    },

    verificationCodeExpiration: {
    type: Date
    }
},
{timestamps:true},
);

module.exports= new mongoose.model("Users",user_model)