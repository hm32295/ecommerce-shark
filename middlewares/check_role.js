const check_role= (req,res,next)=>{

    if (req.user.role==="admin"){
        return next()
    };

return res.status(403).json({
    status_code: "403",
    msg:"Only For Adminds",
    data:null
    });
};   

module.exports=check_role;