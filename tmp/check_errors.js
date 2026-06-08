
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/nexaflow';

const ErrorLogSchema = new mongoose.Schema({
    logId: String,
    type: String,
    severity: String,
    message: String,
    stack: String,
    metadata: Object,
    timestamp: { type: Date, default: Date.now }
});

const ErrorLog = mongoose.models.ErrorLog || mongoose.model('ErrorLog', ErrorLogSchema);

async function checkErrors() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
        const logs = await ErrorLog.find().sort({ timestamp: -1 }).limit(5);
        console.log(JSON.stringify(logs, null, 2));
    } catch (err) {
        console.error("Connection failed:", err.message);
    } finally {
        await mongoose.disconnect();
    }
}

checkErrors();
