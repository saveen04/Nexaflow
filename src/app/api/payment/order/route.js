import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDB from "@/lib/mongodb";
import ErrorLog from "@/models/ErrorLog";

export async function POST(request) {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  const razorpay = new Razorpay({
    key_id: key_id || "rzp_test_placeholder",
    key_secret: key_secret || "placeholder_secret",
  });

  try {
    await connectDB();
    const { amount, currency = "INR", receipt, metadata } = await request.json();

    if (!key_id || !key_secret) {
      const errorMsg = "Razorpay API keys are missing. Authentication failed.";
      await ErrorLog.create({
        logId: `ERR_${Date.now()}`,
        type: "payment",
        severity: "critical",
        message: errorMsg,
        metadata: { amount, receipt }
      });
      return NextResponse.json({ success: false, message: errorMsg }, { status: 401 });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt,
      notes: metadata
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    
    await ErrorLog.create({
      logId: `ERR_${Date.now()}`,
      type: "payment",
      severity: "error",
      message: error.message || "Failed to create Razorpay order",
      stack: error.stack,
      metadata: { error_code: error.code, description: error.description }
    });

    return NextResponse.json(
      { success: false, message: "Could not create Razorpay order", error: error.message },
      { status: 500 }
    );
  }
}
