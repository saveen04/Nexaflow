import mongoose, { Schema } from "mongoose";

const TicketSchema = new Schema(
  {
    ticketId: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "Uncategorized" },
    subcategory: { type: String, default: "" },
    priority: {
      type: String,
      enum: ["critical", "high", "medium", "low"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    confidence: { type: Number, default: 0 },
    aiModel: { type: String, default: "gpt-4o-mini" },
    tokensUsed: { type: Number, default: 0 },
    latency: { type: Number, default: 0 },
    predictionLog: [
      {
        timestamp: { type: Date, default: Date.now },
        model: String,
        tokens: Number,
        latency: Number,
        confidence: Number,
        rawResponse: Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
