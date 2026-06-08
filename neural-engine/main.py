from fastapi import FastAPI, HTTPException, Security, Depends
from fastapi.security.api_key import APIKeyHeader
from pydantic import BaseModel
from groq import Groq
import random
import time
import json
import os
from dotenv import load_dotenv

# Load environment variables (check local and parent)
load_dotenv()
load_dotenv(dotenv_path="../.env")

app = FastAPI(title="NexaFlow Customer Support Engine")

# Security Configuration
API_KEY = "nexaflow_secret_orchestrator_key"
API_KEY_NAME = "X-NexaFlow-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

async def get_api_key(header_key: str = Depends(api_key_header)):
    if header_key == API_KEY:
        return header_key
    raise HTTPException(status_code=403, detail="Neural Access Denied: Invalid Orchestration Key")

# Groq Configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    print("WARNING: GROQ_API_KEY not found in environment. Neural features will fail.")

client = Groq(api_key=GROQ_API_KEY)

class SupportTicket(BaseModel):
    subject: str
    description: str

@app.get("/")
async def root():
    return {"status": "Customer Support Engine Active", "version": "5.0.0", "engine": "Groq-LLM-Orchestrator"}

@app.post("/analyze")
async def analyze_ticket(ticket: SupportTicket, auth_key: str = Depends(get_api_key)):
    start_time = time.time()
    
    # Simple regex-like extraction for ticket ID if present
    extracted_id = "NEW-TICKET"
    import re
    id_match = re.search(r"TKT-\d+", f"{ticket.subject} {ticket.description}")
    if id_match:
        extracted_id = id_match.group(0)

    prompt = f"""
    Analyze the following support ticket and return a JSON object with:
    1. category (Bus Transport, Rail System, Entertainment, Technical, General)
    2. subcategory (e.g., Seat Selection, Ticket Status, Refund, Auth Error, Payment Failure)
    3. priority (Low, Medium, High, Critical)
    4. sentiment (Positive, Neutral, Negative)
    5. ticket_description (Cleaned summary of the original)
    6. error_type (Authentication, Payment, Mapping, Fare Calculation, UI/UX, Backend)
    7. short_note (One-sentence sharp professional insight about the issue)
    8. recommended_fix (Detailed technical instruction)
    9. confidence_score (float 0.8-1.0)
    10. neural_response (Professional AI response)

    Ticket Subject: {ticket.subject}
    Ticket Description: {ticket.description}

    Return ONLY the JSON.
    """

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=800,
            response_format={"type": "json_object"}
        )
        
        result = json.loads(completion.choices[0].message.content)
        process_time = time.time() - start_time
        latency_str = f"{process_time:.2f}s"
        
        # Override extracted_id if LLM found a better one or just use it
        final_ticket_id = extracted_id if extracted_id != "NEW-TICKET" else f"TKT-{random.randint(1000, 9999)}"

        webhook_payload = {
            "webhook_event": "support.neural_enrichment",
            "timestamp": time.ctime(),
            "payload_id": f"evt_{random.randint(100000, 999999)}",
            "data": {
                "ticket_id": final_ticket_id,
                "original_subject": ticket.subject,
                "short_note": result.get("short_note", "Standard diagnostic protocol engaged."),
                "summary": result.get("ticket_description", ticket.description[:100]),
                "classification": {
                    "category": result.get("category", "General"),
                    "subcategory": result.get("subcategory", "Unknown"),
                    "priority": result.get("priority", "medium").lower(),
                    "error_type": result.get("error_type", "Undefined")
                },
                "intelligence": {
                    "sentiment": result.get("sentiment", "Neutral"),
                    "confidence": result.get("confidence_score", 0.95),
                    "latency": latency_str,
                    "latency_raw": process_time,
                    "fix_protocol": result.get("recommended_fix", "Manual review required.")
                },
                "neural_response": result.get("neural_response", "Signal processed via neural matrix.")
            },
            "diagnostics": {
                "model": "groq-llama-3.3-70b",
                "extracted_id": extracted_id
            }
        }

        # Persist to local JSON files
        try:
            with open("support_ticket_analysis.json", "w") as f:
                json.dump(webhook_payload, f, indent=2)
            
            # Audit Persistence
            log_file = "customer_support_audit.json"
            logs = []
            if os.path.exists(log_file):
                with open(log_file, "r") as f:
                    logs = json.load(f)
            logs.append(webhook_payload)
            with open(log_file, "w") as f:
                json.dump(logs, f, indent=2)
        except Exception as log_err:
            print(f"Audit log failed: {log_err}")

        return webhook_payload
        
    except Exception as e:
        print(f"Neural Engine Error: {e}")
        return {
            "success": False,
            "error": str(e),
            "diagnostics": {"status": "Critical Failure"}
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
