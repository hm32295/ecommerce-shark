const usersCollection=require("../../models/users_model")
const bcrypt=require("bcrypt");
const transporter=require("../../confg/transporter_mail")

const register=async(req,res)=>{
    const{name,email,password,phone,secondaryPhone,adress}=req.body;
    if (!name||!email||!password||!phone||!adress) {
        return res.status(401).json({
            status_code : "401",
            msg:"please complete all required fields",
            data:null
        })};

const checkUser=await usersCollection.findOne({email});
    if (checkUser) {
        return res.status(409).json({
            status_code : "409",
            msg:"you are already registered",
            data:null
        })};

const hashPassword= await bcrypt.hash(password,6);

const verificationCode = Math.floor(
    100000 + Math.random() * 900000
    ).toString();

await usersCollection.create({
        name,
        email,
        password :hashPassword,
        phone,
        secondaryPhone,
        adress,
        verificationCode,
        verificationCodeExpiration :new Date (
            Date.now() + 10*60*1000
        )
    });

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
    msg:"you registered successfully !!-- Please Check Your Email--!!",
    data:null
});
};

module.exports=register;