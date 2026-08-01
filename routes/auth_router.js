const express=require("express");
const upload=require("../middlewares/multer");

const register_controller=require("../controller/auth/register");
const login_controller=require("../controller/auth/login");
const emailVerification_controller=require("../controller/auth/verify_email");
const resend_verificationCode_controller=require("../controller/auth/resend_verificationCode");
const router=express.Router();

router.post("/register",upload.single("images"),register_controller);
router.post("/login",login_controller);
router.post("/verify-email",emailVerification_controller);
router.post=("/resend-verification-code",resend_verificationCode_controller);

module.exports=router;
