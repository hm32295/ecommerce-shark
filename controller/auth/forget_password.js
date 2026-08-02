const usersCollection=require("../../models/users_model");
const transporter=require("../../confg/transporter_mail");

const forgetPassword=async(req,res)=>{
    const{email}=req.body;
if (!email){
    return res.status(401).json({
        status_code:"401",
        msg:"Please Enter Your Email",
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

const verificationCode = Math.floor(
    100000 + Math.random() * 900000
).toString();

try {
    const info = await transporter.sendMail({
    from: process.env.VERIFYNG_USER_NAME,
    to: email,
    subject: "Password Reset Code to Econnerce-sharks", 
    text: `Your Password Reset code is: ${verificationCode}`,
    html:`
            <h3>Password Reset</h3>
            <p>Your Password Reset Code Is:</p>
            <h2>${verificationCode}</h2>
        `
        });

        console.log("Message sent", info.messageId);

        await usersCollection.findOneAndUpdate(
            { email },
            {
        verificationCode: verificationCode,
        verificationCodeExpiration: new Date(
            Date.now() + 10 * 60 * 1000
        )
    }
);

} catch (err) {
        console.error("Error while sending mail:", err);
        return res.status(500).json({
        status_code:"500",
        msg:"Failed to send verification email",
        data:null});
        };

return res.status(200).json({
    status_code:"200",
    msg:"Password reset code sent successfully !!!--Please check your email--!!!",
    data:null
});

};
module.exports=forgetPassword;