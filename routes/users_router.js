const blockUser = require('../controller/user/block_user')
const getAllUser = require('../controller/user/get_all_user')
const getSingleUser = require('../controller/user/get_user_by_id')
const check_role = require('../middlewares/check_role')
const is_login_middleware = require('../middlewares/is_login')

const routerUsers = require('express').Router()


routerUsers.get('/',is_login_middleware,check_role, getAllUser)
routerUsers.get('/:userId', getSingleUser)
routerUsers.post('/:userId',is_login_middleware,check_role, blockUser)
module.exports = routerUsers