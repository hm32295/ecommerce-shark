const usersCollection=require("../../models/users_model");
const bcrypt=require("bcrypt");
const changePassword=async(req,res)=>{
    const{password,newPassword}=req.body;
    if (!password || !newPassword){
        return res.status(400).json({
            status_code:"400",
            msg:"All Fields Is Required",
            data:null,
        });
    };

    const userEmail=req.user.email;
    const user=await usersCollection.findOne({email:userEmail});

    if (!user) {
        return res.status(404).json({
            status_code: "404",
            msg: "This Email Is Not Found!!!!!",
            data: null
        });
    }

    const isPasswordCorrect= await bcrypt.compare(password,user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({
        status_code:"401",
        msg:"Wrong Password--!",
        data:null});
    };

    if (isPasswordCorrect){
        const newHashPassword= await bcrypt.hash(newPassword,6)
        await usersCollection.findOneAndUpdate({email:userEmail},
        {
            password:newHashPassword
        });
    };

    return res.status(200).json({
    status_code:"200",
    msg:"Your Password Changed Successfully--!",
    data:null});
};
module.exports=changePassword;