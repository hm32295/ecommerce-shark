const getProfile=async(req,res)=>{
    try{
        res.status(200).json({
            status_code:"200",
            msg:"User Profile Data",
            data:req.user
        })
    }catch(error){
        res.status(500).json({
            status_code:"500",
            msg:"There Are Server Error",
            data:null
        })
    }
};

module.exports=getProfile;