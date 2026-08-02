const usersCollection=require("../../models/users_model");
const deleteUser=async(req,res)=>{
    const userId = req.params.id;
    const deletedUser = await usersCollection.findByIdAndDelete(userId);

    if (!deletedUser) {
    return res.status(404).json({
        status_code: "404",
        msg: "User Not Found",
        data: null
    });
};
    return res.status(200).json({
            status_code :"200",
            msg: "The User Is Deleted Succesfully",
            data:null
        });
};

module.exports=deleteUser;