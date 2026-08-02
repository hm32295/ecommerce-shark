const express = require('express')
const routerUsers = express.Router();
const blockUser = require('../controller/user/block_user')
const getAllUser = require('../controller/user/get_all_user')
const getSingleUser = require('../controller/user/get_user_by_id')
const unBlockUser = require('../controller/user/un_block_user')
const check_role = require('../middlewares/check_role')
const is_login_middleware = require('../middlewares/is_login')
const upload=require("../middlewares/multer");
const isLoginMiddleware=require("../middlewares/is_login");
const inActive_controller=require("../controller/user/delete_my_account");
const activate_account_controller = require("../controller/user/activate_account");
const delete_user=require("../controller/user/delete_user");

routerUsers.get('/',is_login_middleware,check_role, getAllUser)
routerUsers.get('/:userId', getSingleUser)
routerUsers.post('/block/:userId',is_login_middleware,check_role,blockUser)
routerUsers.post('/un-block/:userId',is_login_middleware,check_role, unBlockUser)
routerUsers.patch("/inactive-account",isLoginMiddleware,inActive_controller);
routerUsers.post("/activate-account",activate_account_controller);
routerUsers.delete("/delete-user/:id",isLoginMiddleware,check_role,delete_user);



module.exports = routerUsers