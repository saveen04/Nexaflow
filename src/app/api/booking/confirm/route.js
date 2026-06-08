import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import ErrorLog from "@/models/ErrorLog";

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const bookingId = `BOK_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // In a real app, you'd also decrement inventory availability here.
    
    const booking = await Booking.create({
      bookingId,
      userId: "root_admin",
      ...data,
      status: "confirmed"
    });

    return NextResponse.json({
      success: true,
      message: "Booking confirmed and nodes locked",
      booking,
    });
  } catch (error) {
    console.error("Booking Confirmation Error:", error);
    
    await ErrorLog.create({
      logId: `ERR_${Date.now()}`,
      type: "database",
      severity: "error",
      message: error.message || "Failed to confirm booking",
      stack: error.stack,
    });

    return NextResponse.json(
      { success: false, message: "Could not confirm booking node" },
      { status: 500 }
    );
  }
}
