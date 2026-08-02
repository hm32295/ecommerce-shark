const usersCollection=require("../../models/users_model");

const verify_email=async(req,res)=>{
    const{email,verificationCode}=req.body;

const user=await usersCollection.findOne({email});
if (!user){
        return res.status(404).json({
        status_code:"404",
        msg:"this email is not found",
        data:null
    });
};

if(user.verificationCode !==verificationCode){
    return res.status(400).json({
        status_code:"400",
        msg:"Invalid Code",
        data:null
    });
};

if (user.verificationCodeExpiration<new Date()){
    return res.status(400).json({
        status_code:"400",
        msg:"Expired Code",
        data:null
    });
};

if (user.verificationCode===verificationCode){
    await usersCollection.findOneAndUpdate(
    {email},{
        isVerified: true,
        $unset:
        {verificationCode: 1,
        verificationCodeExpiration: 1}
    });
        
    return res.status(200).json({
    status_code:"200",
    msg:"congratulation your code is VALID",
    data:null});
};
};

module.exports=verify_email;

