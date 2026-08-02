const usersCollection=require("../../models/users_model");
const bcrypt=require("bcrypt");

const activate_account=async(req,res)=>{
    const {email,password}=req.body;
    if (!email || !password){
        return res.status(400).json({
            status_code : "400",
            msg:"please complete all required fields",
            data:null
        });};
const checkUser=await usersCollection.findOne({email});
    if (!checkUser){
        return res.status(404).json({
            status_code : "404",
            msg:"This Email Is Not Found",
            data:null
        });
    };

if (!checkUser.inactive){
    return res.status(400).json({
        status_code: "400",
        msg: "This account is already active",
        data: null
    });
}

const authPassword = await bcrypt.compare(password,checkUser.password);
if(!authPassword){
        return res.status(401).json({
            status_code :"401",
            msg: "please add the correct password",
            data:null
        })
    };

await usersCollection.findOneAndUpdate({email},
    {
        inactive:false
    });

return res.status(200).json({
            status_code :"200",
            msg: "You Activate Your Account Succesfully--Plesse Login!!",
            data:null
        });
};

module.exports=activate_account;