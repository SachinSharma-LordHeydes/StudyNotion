const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const courseModel = require('../Models/courseModel');
const userModel = require('../Models/userModel');
const PurchasedItem = require('../Models/purchasedItemModel');
const {verifyEsewaPayment}=require('../Models/esewa')

require("dotenv").config();

router.post('/payment/initialize-esewa', async (req, res) => {
  try {
    const { itemId, totalPrice , user } = req.body;

    // console.log("ESEWA_SECRET_KEY---------:", process.env.ESEWA_SECRET_KEY); 
    // console.log("ESEWA_PRODUCT_CODE-----------:", process.env.ESEWA_PRODUCT_CODE);

    if (!itemId || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: itemId or totalPrice',
      });
    }

    // Step 1: Validate course and price
    const itemData = await courseModel.findOne({
      _id: itemId,
      price: Number(totalPrice).toFixed(2), // Ensure 2 decimal places
    });

    if (!itemData) {
      return res.status(404).json({
        success: false,
        message: 'Item not found or price mismatch.',
      });
    }

    // Step 2: Create a purchased item record
    const purchasedItem = await PurchasedItem.create({
      user,
      course: itemId,
      paymentMethod: 'esewa',
      totalPrice: Number(totalPrice).toFixed(2), // Ensure 2 decimal places
    });

    // Step 3: Generate eSewa signature
    const transaction_uuid = purchasedItem._id.toString();
    const signatureString = `total_amount=${Number(totalPrice).toFixed(2)},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;
    const signature = crypto
      .createHmac('sha256', process.env.ESEWA_SECRET_KEY)
      .update(signatureString)
      .digest('base64');

    // Step 4: Return signature and data
    return res.json({
      success: true,
      payment: {
        signature,
        signed_field_names: 'total_amount,transaction_uuid,product_code',
      },
      purchasedItemData: purchasedItem,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to initialize payment.',
      error: error.message,
    });
  }
});

router.get('/payment/complete-payment', async (req, res) => {
  try {
    const { data } = req.query;

    if (!data) {
      throw new Error('No payment data received.');
    }

    // Verify eSewa payment
    const paymentInfo = await verifyEsewaPayment(data);

    
    const purchasedItem = await PurchasedItem.findById(
      paymentInfo.response.transaction_uuid
    );
    console.log("purchasedItem ==================>",purchasedItem)

    if (!purchasedItem) {
      throw new Error('Purchase record not found.');
    }

    // Update payment and purchase status
    await PurchasedItem.findByIdAndUpdate(purchasedItem._id, { status: 'completed' });

    const userResponse=await userModel.findByIdAndUpdate(purchasedItem.user, {
      $addToSet: { courseEnrolled: purchasedItem.course },
    }).populate("courseEnrolled")
      .populate('cart')

    console.log("enrolled studenr pushed------->",userResponse)

    return res.redirect(`${process.env.FRONTEND_URL}/dashboard/enrolled-courses`);
  } catch (error) {
    console.error('Payment completion error:', error.message);
    return res.redirect(
      `${process.env.FRONTEND_URL}/dashboard/enrolled-courses`
    );
  }
});



module.exports = router;
