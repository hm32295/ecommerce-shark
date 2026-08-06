const usersCollection=require("../../models/users_model");
const transporter = require("../../confg/transporter_mail");
const bcrypt=require("bcrypt");

const change_email=async(req,res)=>{
    const{newEmail,password}=req.body;
    if (!newEmail || !password){
        return res.status(400).json({
            status_code : "400",
            msg:"please complete all required fields",
            data:null
        });
    } 
    const userEmail=req.user.email
    const checkUser= await usersCollection.findOne({email:userEmail});
    if (!checkUser){
        return res.status(404).json({
            status_code : "404",
            msg:"This Email Is Not Found",
            data:null
        });
    };

const checkNewEmail= await usersCollection.findOne({email:newEmail});
if (checkNewEmail) {
    return res.status(409).json({
            status_code : "409",
            msg:"This Email Is Already Exist!!",
            data:null
        })
};

if (newEmail === checkUser.email) {
    return res.status(400).json({
        status_code: "400",
        msg: "This Is Your Current Email",
        data: null
    });
}

const hashPassword= await bcrypt.compare(password,checkUser.password);
if(!hashPassword){
    return res.status(401).json({
        status_code:"401",
        msg:"Wrong Password--!",
        data:null});
};

const verificationCode = Math.floor(
    100000 + Math.random() * 900000
    ).toString();


try {
        const info = await transporter.sendMail({
        from: process.env.VERIFYNG_USER_NAME,
        to: newEmail,
        subject: "verify your email", 
        text: `Your verification code is: ${verificationCode}`,
        html:`
            <h3>Email Verification</h3>
            <p>Your verification code is:</p>
            <h2>${verificationCode}</h2>
        `
        });

        console.log("Message sent", info.messageId);
        
} catch (err) {
        console.error("Error while sending mail:", err);
        return res.status(500).json({
        status_code:"500",
        msg:"Failed to send verification email",
        data:null});
        };

await usersCollection.findByIdAndUpdate(checkUser.id,
    {
        newEmail,
        newEmailVerificationCode:verificationCode,
        newEmailVerificationCodeExpiration :new Date (
            Date.now() + 10*60*1000)
    }
)
return res.status(201).json({
    status_code:"201",
    msg:"Please Check Your Email--!!To complete Your Process",
    data:null
});

};

module.exports=change_email;
