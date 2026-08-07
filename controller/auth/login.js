const usersCollection=require("../../models/users_model");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");


const login = async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(401).json({
            status_code:"401",
            msg: "please complete all fields"
        })};

const checkUser=  await usersCollection.findOne({email})
    if(!checkUser){
        return res.status(404).json({
            status_code :"404",
            msg: "please regist firstly"
        })};

const authPassword = await bcrypt.compare(password,checkUser.password);

if(!authPassword){
        return res.status(401).json({
            status_code :"401",
            msg: "please add the correct password"
        })
    };

if (checkUser.isBlocked){
    return res.status(403).json({
            status_code :"403",
            msg: "This User Are Blicked"
        });
};
if (checkUser.inactive){
    return res.status(403).json({
            status_code :"403",
            msg: "This account is inactive"
        });
}   
if (!checkUser.isVerified) {
    return res.status(403).json({
        status_code: "403",
        msg: "Please verify your email first",
        data: null
    });
}
//if user registered but not entered verification code//

const secret_key=process.env.JWT_SECRET;
const token = jwt.sign(
    {
        id: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
    },
        secret_key,
    {
        expiresIn: "7d",
    }
);

res.cookie("token", token,{httpOnly: true,path: "/",secure: false})

return res.status(200).json({
            status_code :"200",
            msg: "You Logged in  Succesfully",
            data:{
                token:token,
                id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email,
                phone: checkUser.phone,
                adress: checkUser.adress,
                image: checkUser.image
            },
        },
    );
};

module.exports=login;