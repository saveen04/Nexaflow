const Razorpay = require('razorpay');
require('dotenv').config({ path: '.env.local' });

async function test() {
  const rzp = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const order = await rzp.orders.create({
      amount: 100,
      currency: "INR",
      receipt: "test_receipt"
    });
    console.log("SUCCESS:", order.id);
  } catch (err) {
    console.log("FAILURE:", err);
  }
}

test();
