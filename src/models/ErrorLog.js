import mongoose from "mongoose";

const ErrorLogSchema = new mongoose.Schema({
  logId: { type: String, required: true },
  type: { type: String, enum: ["payment", "api", "database", "neural"], required: true },
  severity: { type: String, enum: ["critical", "error", "warning"], default: "error" },
  message: { type: String, required: true },
  stack: String,
  metadata: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.ErrorLog || mongoose.model("ErrorLog", ErrorLogSchema);
