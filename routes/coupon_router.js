const addCoupon = require('../controller/coupons/create_coupon')
const deleteCoupon = require('../controller/coupons/delete_coupon')
const getAllCoupons = require('../controller/coupons/get_all_coupon')
const getSingleCoupons = require('../controller/coupons/get_single_coupon')
const updateCoupon = require('../controller/coupons/update_coupon')
const check_role = require('../middlewares/check_role')
const is_login_middleware = require('../middlewares/is_login')

const couponRouter = require('express').Router()

couponRouter.post('/' ,is_login_middleware,check_role,addCoupon)
couponRouter.get('/' ,is_login_middleware,check_role,getAllCoupons)
couponRouter.get('/:id' ,getSingleCoupons)
couponRouter.put('/:id' ,is_login_middleware,check_role,updateCoupon)
couponRouter.delete('/:id' ,is_login_middleware,check_role,deleteCoupon)

module.exports = couponRouter