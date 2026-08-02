const express=require("express");
const upload=require("../middlewares/multer");
const isLoginMiddleware=require("../middlewares/is_login");
const checkRole_middlware=require("../middlewares/check_role")

const register_controller=require("../controller/auth/register");
const login_controller=require("../controller/auth/login");
const emailVerification_controller=require("../controller/auth/verify_email");
const resend_verificationCode_controller=require("../controller/auth/resend_verificationCode");
const logOut_controller=require("../controller/auth/logOut");
const forgetPassword_controller=require("../controller/auth/forget_password.js");
const reset_password=require("../controller/auth/reset_password");
const change_password=require("../controller/auth/change_password");

const router=express.Router();

router.post("/register",upload.single("images"),register_controller);
router.post("/login",login_controller);
router.post("/verify-email",emailVerification_controller);
router.post("/resend-verification-code",resend_verificationCode_controller);
router.post("/log-out",logOut_controller);
router.post("/forget-password",forgetPassword_controller);
router.post("/reset-password",reset_password);
router.post("/change-password",isLoginMiddleware,change_password);

module.exports=router;
