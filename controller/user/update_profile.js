const usersCollection=require("../../models/users_model");
const update_profile=async(req,res)=>{
    const{name,email,phone,secondaryPhone,adress,image}=req.body;
            if (!name || !email || !phone || !adress) {
                return res.status(400).json({
                status_code: "400",
                msg: "All Fields Is Required",
                data: null
            });
        }
        const userId= req.user.id;
        const user= await usersCollection.findById(userId)

        if (!user) {
            return res.status(404).json({
                status_code: "404",
                msg: "This Email Is Not Found",
                data: null
            });
        };
        const updatedUser = await usersCollection.findByIdAndUpdate(userId,
            {...req.body},{new:true} );
            
return res.status(200).json({
        status_code: "200",
        msg: "You Updated Your Profile Successfully",
        data: {
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            secondaryPhone: updatedUser.secondaryPhone,
            adress: updatedUser.adress,
            image: updatedUser.image
        }
    });       
};

module.exports=update_profile;
