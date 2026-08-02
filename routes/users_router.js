const express=require("express");
const upload=require("../middlewares/multer");
const isLoginMiddleware=require("../middlewares/is_login");
const checkRole_middlware=require("../middlewares/block_user");

const inActive_controller=require("../controller/user/delete_my_account");
const activate_account_controller=require("../controller/user/activate_account");
const delete_user=require("../controller/user/delete_user");

const router = express.Router();

router.patch("/inactive-account",isLoginMiddleware,inActive_controller);
router.post("/activate-account",activate_account_controller);
router.delete("/delete-user/:id",isLoginMiddleware,checkRole_middlware,delete_user);


module.exports=router;