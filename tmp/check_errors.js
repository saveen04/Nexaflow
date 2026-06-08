const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/ai-tickets';

const ErrorLogSchema = new mongoose.Schema({
  logId: String,
  type: String,
  severity: String,
  message: String,
  stack: String,
  metadata: mongoose.Schema.Types.Mixed,
  timestamp: Date
});

const ErrorLog = mongoose.models.ErrorLog || mongoose.model("ErrorLog", ErrorLogSchema);

async function check() {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
    
    const logs = await ErrorLog.find().sort({ timestamp: -1 }).limit(3);
    console.log("LAST 3 ERROR LOGS:");
    console.log(JSON.stringify(logs, null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error("FAILED TO CHECK LOGS:", err);
    process.exit(1);
  }
}

check();
