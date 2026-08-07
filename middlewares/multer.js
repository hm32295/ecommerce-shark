const multer=require("multer");
const cloudinary=require("../confg/cloudnary");
const {CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
    folder:"sharks",
    allowed_formats:["jpg","png","jfif",'jpeg']
    },
});
const upload=multer({ storage,});


module.exports=upload;