const usersCollection=require("../../models/users_model");
const transporter=require("../../confg/transporter_mail");

const resend_verificationCode=async(req,res)=>{
    const{email}=req.body;
    if (!email){
        return res.status(401).json({
            status_code:"401",
            msg:"Please Enter Your Email To resend you another VERIFICATION CODE",
            data:null,
        });
    };

    const user= await usersCollection.findOne({email});
    if (!user){
        return res.status(404).json({
            status_code:"404",
            msg:"Your Email Is Not Found",
            data:null,
        });
    }; 

if (user.isVerified) {
    return res.status(400).json({
        status_code: "400",
        msg: "Your email is already verified",
        data: null
    });
};

const verificationCode = Math.floor(
    100000 + Math.random() * 900000
    ).toString();

await usersCollection.findOneAndUpdate(
    {email},{
        verificationCode: verificationCode,
        verificationCodeExpiration :new Date (
            Date.now() + 10*60*1000
        )}
    );

try {
    const info = await transporter.sendMail({
    from: process.env.VERIFYNG_USER_NAME,
    to: email,
    subject: "verify your email to regist to Econnerce-sharks", 
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

return res.status(201).json({
    status_code:"201",
    msg:"The Code Is Send Succeefully!!-- Please Check Your Email--!!",
    data:null
});
};

module.exports=resend_verificationCode;
