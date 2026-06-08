import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "placeholder_secret")
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Here you would typically update the database to mark the booking as paid
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    return NextResponse.json(
      { success: false, message: "Could not verify payment" },
      { status: 500 }
    );
  }
}
