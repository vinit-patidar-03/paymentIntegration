const express = require('express');
const { createOrderController, paymentVerification } = require('../controllers/paymentController');
const router = express.Router();

router.post('/createOrder', createOrderController);
router.post('/paymentVerify', paymentVerification);

module.exports = router;