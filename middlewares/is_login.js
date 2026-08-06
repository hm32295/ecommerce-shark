const usersCollection=require("../models/users_model");
const { jwtDecode } = require("jwt-decode")

const is_login_middleware = async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        
        if (!token){
                return res.status(401).json({
                status_code:"401",
                msg:"Please Login Firstly",
                data:null});
            };

const decoded = jwtDecode(token);
const userId=decoded.id

const user = await usersCollection.findById(userId);
        if (!user) {
            return res.status(404).json({
            status_code :"404",
            msg: "please regist firstly",
            data:null,
        })
};

            if (user.isBlocked){
                return res.status(403).json({
                status_code :"403",
                msg: "This User Are Blocked",
                data:null
            });
};
    
            if (user.inactive){
                return res.status(403).json({
                status_code :"403",
                msg: "This account is inactive",
                data:null
            });
}  

req.user = user;
            //TO USE ANY KEY WITH ANY OTHER CONTROLLER
            next()

        }catch(error){
                return res.status(401).json({
                status_code: "401",
                msg: "Expired Token",
                data: null
            });
        }
};


module.exports=is_login_middleware;