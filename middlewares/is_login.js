const {jwtDecode}=require("jwt-decode")
is_login_middleware= async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if (!token){
                return res.status(401).json({
                status_code:"401",
                msg:"Please Login Firstly",
                data:null});
            };
            const decoded = jwtDecode(token);
            req.user = decoded;
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