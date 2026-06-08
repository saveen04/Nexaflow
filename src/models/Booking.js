import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  type: { type: String, enum: ["bus", "train", "movie"], required: true },
  details: {
    source: String,
    destination: String,
    date: Date,
    passengers: Number,
    vehicleType: String, // e.g., Volvo, AC Sleeper
    class: String, // for trains
    pnr: String,
    theatre: String,
    movie: String,
    seats: [String],
    qrCode: String
  },
  fare: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "confirmed" },
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
