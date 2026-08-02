const blockUser = require('../controller/user/block_user')
const getAllUser = require('../controller/user/get_all_user')
const getSingleUser = require('../controller/user/get_user_by_id')
const unBlockUser = require('../controller/user/un_block_user')
const check_role = require('../middlewares/check_role')
const is_login_middleware = require('../middlewares/is_login')

const routerUsers = require('express').Router()


routerUsers.get('/',is_login_middleware,check_role, getAllUser)
routerUsers.get('/:userId', getSingleUser)
routerUsers.post('/block/:userId',is_login_middleware,check_role,blockUser)
routerUsers.post('/un-block/:userId',is_login_middleware,check_role, unBlockUser)
module.exports = routerUsers