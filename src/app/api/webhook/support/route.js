import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import ErrorLog from "@/models/ErrorLog";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { subject, description } = body;

    console.log(">> PROXYING TO NEURAL ENGINE:", { subject, description });

    // Bridge to Standalone Python Neural Engine
    let neuralData;
    try {
        const neuralResponse = await fetch("http://localhost:8000/analyze", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "X-NexaFlow-Key": "nexaflow_secret_orchestrator_key"
            },
            body: JSON.stringify({ subject, description }),
            cache: 'no-store'
        });

        if (!neuralResponse.ok) {
            throw new Error(`Neural Engine Status: ${neuralResponse.status}`);
        }
        neuralData = await neuralResponse.json();
    } catch (neuralErr) {
        console.error("!! NEURAL ENGINE ERROR:", neuralErr.message);
        await ErrorLog.create({
            logId: `ERR_${Date.now()}`,
            type: "neural",
            severity: "error",
            message: `Neural Engine Connection Failed: ${neuralErr.message}`,
            metadata: { subject, description }
        });
        throw neuralErr;
    }

    // Save to MongoDB Persistence Layer
    if (!neuralData.data) {
        throw new Error("Neural Engine response missing 'data' node");
    }

    const ticketId = neuralData.data.ticket_id;
    const { category, subcategory, priority } = neuralData.data.classification;
    const { confidence, latency_raw } = neuralData.data.intelligence;

    console.log(">> INITIATING PERSISTENCE:", ticketId);

    const savedTicket = await Ticket.create({
        ticketId,
        subject,
        description,
        category: category || "Uncategorized",
        subcategory: subcategory || "",
        priority: (priority || "medium").toLowerCase(),
        status: "open",
        confidence: confidence || 0,
        latency: latency_raw || 0,
        predictionLog: [{
            model: "Llama-3.3-70B (Groq)",
            confidence: confidence,
            latency: latency_raw,
            rawResponse: neuralData
        }]
    });

    console.log("<< PERSISTENCE SYNC COMPLETE:", ticketId);

    return NextResponse.json({
        success: true,
        ...neuralData,
        timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("!! SUPPORT WEBHOOK CRITICAL FAILURE:", error);
    
    try {
        await ErrorLog.create({
            logId: `ERR_${Date.now()}`,
            type: "api",
            severity: "error",
            message: error.message || "Support Webhook Pipeline Failure",
            stack: error.stack,
            metadata: { subject: body?.subject || "Unknown" }
        });
    } catch (logErr) {
        console.error("!! FAILED TO PERSIST ERROR LOG:", logErr);
    }

    return NextResponse.json({ 
        success: false, 
        error: "Neural Pipeline Failure", 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
