import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
  nodeId: { type: String, required: true, unique: true },
  type: { type: String, enum: ["bus", "train", "movie"], required: true },
  name: { type: String, required: true },
  number: String, // Vehicle/Screen number
  source: String,
  destination: String,
  date: { type: String, required: true },
  time: { type: String, required: true },
  capacity: { type: Number, required: true },
  available: { type: Number, required: true },
  price: { type: Number, required: true },
  sourceCoord: [Number],
  destCoord: [Number],
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Inventory || mongoose.model("Inventory", InventorySchema);
