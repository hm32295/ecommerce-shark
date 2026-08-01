const addCoupon = require('../controller/coupons/create_coupon')
const deleteCoupon = require('../controller/coupons/delete_coupon')
const getAllCoupons = require('../controller/coupons/get_all_coupon')
const getSingleCoupons = require('../controller/coupons/get_single_coupon')
const updateCoupon = require('../controller/coupons/update_coupon')

const couponRouter = require('express').Router()

couponRouter.post('/' ,addCoupon)
couponRouter.get('/' ,getAllCoupons)
couponRouter.get('/:id' ,getSingleCoupons)
couponRouter.put('/:id' ,updateCoupon)
couponRouter.delete('/:id' ,deleteCoupon)

module.exports = couponRouter