import { classifyTicket } from "./src/lib/classify.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testClassification() {
  console.log("Testing AI Classification...");
  try {
    const result = await classifyTicket(
      "TEST-123",
      "I need to cancel my bus ticket to Boston",
      "My plans changed and I can no longer travel on June 12th. I want a full refund."
    );
    console.log("Classification Result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testClassification();
