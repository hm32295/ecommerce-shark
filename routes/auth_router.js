const express=require("express");
const register_controller=require("../controller/auth/register");
const login_controller=require("../controller/auth/login")
const emailVerification_controller=require("../controller/auth/verify_email")
const router=express.Router();

router.post("/register",register_controller)
router.post("/login",login_controller)
router.post("/verify-email",emailVerification_controller)

module.exports=router;
