const logOut=async(req,res)=>{
    res.clearCookie("token",{
        path:"/",
    })

return res.status(200).json({
    status_code :"200",
    msg: "You Logged Out Succesfully!! "
});
    };

module.exports=logOut;