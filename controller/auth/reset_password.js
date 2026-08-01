const usersCollection=require("../../models/users_model");
const bcrypt=require("bcrypt");
const resetPassword=async(req,res)=>{

    const{email,verificationCode,newPassword}=req.body;
    if (!email ||!verificationCode ||!newPassword){
        return res.status(400).json({
            status_code:"400",
            msg:"All Fields Is Required",
            data:null
        }); 
    };
    
    const ckeckUser= await usersCollection.findOne({email});
    if (!ckeckUser){
        return res.status(404).json({
            status_code: "404",
            msg: "This Email Is Not Found!!!!!",
            data: null
        });
    };
    
    if(ckeckUser.verificationCode !==verificationCode){
        return res.status(400).json({
        status_code:"400",
        msg:"Invalid Code",
        });
};

    if (ckeckUser.verificationCodeExpiration<new Date()){
        return res.status(400).json({
        status_code:"400",
        msg:"your code Is Expired",
        });
};

const hashPassword = await bcrypt.hash(newPassword, 6);

await usersCollection.findOneAndUpdate(
    {email},
        { 
            password:hashPassword,
            $unset:
            {verificationCode: 1,
            verificationCodeExpiration: 1}
        }
        );
    
return res.status(200).json({
    status_code:"200",
    msg:"You Reset Your Password Successfully!!!!",
    data:null
});
}
module.exports=resetPassword;