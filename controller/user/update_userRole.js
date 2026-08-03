const usersCollection=require("../../models/users_model");
const updateUserRole=async(req,res)=>{
    const userId=req.params.id
    const updateUser = await usersCollection.findById(userId)

if (!updateUser) {
    return res.status(404).json({
        status_code: "404",
        msg: "Useris  Not Found",
        data: null
    });
}

if (updateUser.role=== "user"){
    updateUser.role==="admin"
}else{
    updateUser.role==="user"
};

return res.status(200).json({
        status_code :"200",
        msg: "The User Role Is Updated Succesfully",
        data:null
    });
};

module.exports=updateUserRole;
