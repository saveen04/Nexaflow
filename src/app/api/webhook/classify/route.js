import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import PredictionLog from "@/models/PredictionLog";
import { classifyTicket } from "@/lib/classify";

export async function POST(req) {
  try {
    const body = await req.json();
    const { ticketId, subject, description, model } = body;

    if (!ticketId || !subject || !description) {
      return NextResponse.json(
        { error: "ticketId, subject, and description are required" },
        { status: 400 }
      );
    }

    const result = await classifyTicket(
      ticketId,
      subject,
      description,
      model || "gpt-4o-mini"
    );

    await connectDB();

    // Upsert ticket
    const ticket = await Ticket.findOneAndUpdate(
      { ticketId },
      {
        ticketId,
        subject,
        description,
        category: result.category,
        subcategory: result.subcategory,
        priority: result.priority,
        confidence: result.confidence,
        aiModel: result.model,
        tokensUsed: result.tokensUsed,
        latency: result.latency,
        $push: {
          predictionLog: {
            timestamp: new Date(),
            model: result.model,
            tokens: result.tokensUsed,
            latency: result.latency,
            confidence: result.confidence,
            rawResponse: result.rawResponse,
          },
        },
      },
      { upsert: true, new: true }
    );

    // Save prediction log
    await PredictionLog.create({
      ticketId,
      subject,
      aiModel: result.model,
      tokens: result.tokensUsed,
      latency: result.latency,
      confidence: result.confidence,
      category: result.category,
      priority: result.priority,
      rawResponse: result.rawResponse,
    });

    return NextResponse.json({
      success: true,
      ticketId,
      classification: {
        category: result.category,
        subcategory: result.subcategory,
        priority: result.priority,
        confidence: result.confidence,
        reasoning: result.reasoning,
        suggestedActions: result.suggestedActions,
      },
      meta: {
        model: result.model,
        tokensUsed: result.tokensUsed,
        latency: result.latency,
        timestamp: new Date().toISOString(),
      },
      _id: ticket._id,
    });
  } catch (err) {
    console.error("Webhook classify error:", err);
    return NextResponse.json(
      { error: "Classification failed", details: String(err) },
      { status: 500 }
    );
  }
}
