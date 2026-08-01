const multer=require("multer");
const {CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary=require("../confg/cloudnary");

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
    folder:"sharks",
    allowed_formats:["jpg","png","jfif"]
    },
});
const upload=multer({
    storage,
});

module.exports=upload;