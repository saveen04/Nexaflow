import mongoose, { Schema } from "mongoose";

const PredictionLogSchema = new Schema(
  {
    ticketId: { type: String, required: true },
    subject: { type: String, required: true },
    aiModel: { type: String, required: true },
    tokens: { type: Number, default: 0 },
    latency: { type: Number, default: 0 },
    confidence: { type: Number, default: 0 },
    category: { type: String, default: "" },
    priority: { type: String, default: "" },
    rawResponse: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.models.PredictionLog ||
  mongoose.model("PredictionLog", PredictionLogSchema);
