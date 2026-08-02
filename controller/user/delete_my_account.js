const usersCollection=require("../../models/users_model");
const inactiveAccount=async(req,res)=>{
    const userEmail=req.user.email
    const user= await usersCollection.findOne({email:userEmail});
    if (!user) {
        return res.status(404).json({
                status_code: "404",
                msg: "This Email Is Not Found",
                data: null
            });
    };

await usersCollection.findOneAndUpdate({email:userEmail},
    {
        inactive:true
    }
);

res.clearCookie("token",{
        path:"/",
    });

return res.status(200).json({
    status_code: "200",
    msg: "You INACTIVATE Your Account Successfully",
    data: null
});
}

module.exports=inactiveAccount;