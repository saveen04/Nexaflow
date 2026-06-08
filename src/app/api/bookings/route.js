import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { booking, payment } = body;

    // Save Payment
    const newPayment = await Payment.create({
      ...payment,
      createdAt: new Date()
    });

    // Save Booking
    const newBooking = await Booking.create({
      ...booking,
      paymentId: newPayment.paymentId,
      createdAt: new Date()
    });

    return NextResponse.json({ 
      success: true, 
      bookingId: newBooking.bookingId,
      paymentId: newPayment.paymentId 
    });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
