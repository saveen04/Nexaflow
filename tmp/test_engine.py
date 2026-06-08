
import requests
import json

url = "http://localhost:8000/analyze"
payload = {
    "subject": "Test Ticket",
    "description": "My bus was delayed and I need a refund."
}
headers = {
    "Content-Type": "application/json",
    "X-NexaFlow-Key": "nexaflow_secret_orchestrator_key"
}

try:
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
