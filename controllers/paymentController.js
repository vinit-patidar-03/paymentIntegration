const Payment = require("../models/paymentSchema");
const razorpayInstance = require("../razorpay/razorpayInstance");
const crypto = require('crypto');

const createOrderController = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR"
        }
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(400).send({ success: false, msg: "some error occured" });
    }
}

const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const { id } = req.query;

    const genSign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(genSign.toString()).digest('hex');
    if (expectedSignature === razorpay_signature) {
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })

        res.status(200).redirect(`https://atozbyvinit.vercel.app/paymentSuccess?reference=${razorpay_payment_id}&id=${id}`);
    }
}

module.exports = { createOrderController, paymentVerification }