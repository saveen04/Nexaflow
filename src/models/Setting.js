import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  theme: { type: String, default: "dark" },
  notificationsEnabled: { type: Boolean, default: true },
  aiAssistance: { type: Boolean, default: true },
  webhookUrl: String,
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
