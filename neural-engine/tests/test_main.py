import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert "Customer Support Engine Active" in response.json()["status"]

def test_analyze_unauthorized():
    response = client.post("/analyze", json={
        "subject": "Missing Ticket",
        "description": "I cannot find my ticket in the dashboard."
    })
    assert response.status_code == 403
    assert "Invalid Orchestration Key" in response.json()["detail"]

def test_analyze_authorized():
    # Test with the secret orchestrator key
    response = client.post("/analyze", 
        json={
            "subject": "Payment Error",
            "description": "The Razorpay checkout timed out when I tried to pay for my bus ticket."
        },
        headers={"X-NexaFlow-Key": "nexaflow_secret_orchestrator_key"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "analysis" in data
    assert "category" in data["analysis"]
    assert "subcategory" in data["analysis"]
    assert "error_type" in data["analysis"]
    assert "recommended_fix" in data["analysis"]
    assert "diagnostics" in data
    assert "orch_prompt" in data["diagnostics"]
