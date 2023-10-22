const express = require('express');
const connectMongoDB = require('./db');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = 5000 || process.env.PORT;

connectMongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/payment/v1',require('./routes/paymentRazorpay'));

app.get('/getKey',(req,res)=>res.status(200).json({key: process.env.RAZORPAY_KEY_ID}));
app.listen(PORT,() => {
    console.log(`server is running on http//localhost:${PORT}`);
})