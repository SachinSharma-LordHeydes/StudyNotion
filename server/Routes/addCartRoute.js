const express=require('express');
const router=express.Router();

const {addCartHandler,removeFromTheCart}=require('../Controlleres/cartHandler')

router.post('/course/addToCart',addCartHandler);
router.post('/course/removeFromTheCart',removeFromTheCart);


module.exports = router;