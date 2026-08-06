const usersCollection=require("../../models/users_model");
const verifyNewEmail=async(req,res)=>{
    const{verificationCode}=req.body;
    const userId=req.user.id
    const user=await usersCollection.findById(userId);
    if (!user) {
        return res.status(404).json({
            status_code : "404",
            msg:"This Email Is Not Found",
            data:null
        });
    };
    
    if(user.newEmailVerificationCode!==verificationCode){
    return res.status(400).json({
        status_code:"400",
        msg:"Invalid Code",
        data:null
    });
};

    if (user.newEmailVerificationCodeExpiration<new Date()) {
        return res.status(400).json({
        status_code:"400",
        msg:"Expired Code",
        data:null
    });
    };

    if (user.newEmailVerificationCode===verificationCode){
        await usersCollection.findByIdAndUpdate(
        userId,
        {
            email:user.newEmail,
            $unset:
            {
            newEmail:1,
            newEmailVerificationCode: 1,
            newEmailVerificationCodeExpiration: 1}
        });
        return res.status(200).json({
        status_code:"200",
        msg:"Your Email Is Changed Succesfully",
        data:null});    
    }
};

module.exports=verifyNewEmail;