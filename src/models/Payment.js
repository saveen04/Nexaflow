import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true },
  bookingId: { type: String, required: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  method: { type: String, enum: ["stripe", "razorpay"], required: true },
  status: { type: String, enum: ["pending", "succeeded", "failed"], default: "succeeded" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
