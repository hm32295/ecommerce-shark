const usersCollection=require("../../models/users_model");
const bcrypt=require("bcrypt");

const login = async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(401).json({
            status_code:"401",
            msg: "please complete all fields"
        })};

const checkUser=  await user_model.findOne({email})
    if(!checkUser){
        return res.status(401).json({
            status_code :"401",
            msg: "please regist firstly"
        })};

const authPassword = await bcrypt.compare(password,checkUser.password);


};

module.exports=login;