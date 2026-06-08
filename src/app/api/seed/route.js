import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import PredictionLog from "@/models/PredictionLog";

const categories = [
  { cat: "Technical Issue", sub: "Software Bug" },
  { cat: "Technical Issue", sub: "Network Problem" },
  { cat: "Technical Issue", sub: "Hardware Failure" },
  { cat: "Account & Access", sub: "Login Issue" },
  { cat: "Account & Access", sub: "Password Reset" },
  { cat: "Billing & Payment", sub: "Invoice Query" },
  { cat: "Billing & Payment", sub: "Payment Failed" },
  { cat: "Feature Request", sub: "New Feature" },
  { cat: "General Inquiry", sub: "Information Request" },
];

const priorities = ["critical", "high", "medium", "low"];
const statuses = ["open", "in-progress", "resolved", "closed"];

const subjects = [
  "Unable to login to the platform",
  "Application crashes on startup",
  "Network connection timeout errors",
  "Invoice not received for last month",
  "Request for dark mode feature",
  "Password reset email not arriving",
  "API integration failing with 500 error",
  "Performance degradation in production",
  "How to export data to CSV",
  "MFA setup not working properly",
  "Database connection error",
  "UI rendering issues on mobile",
  "Payment declined unexpectedly",
  "Need bulk import functionality",
  "SSL certificate expiry warning",
];

export async function POST() {
  try {
    await connectDB();
    await Ticket.deleteMany({});
    await PredictionLog.deleteMany({});

    const tickets = [];
    const logs = [];

    for (let i = 1; i <= 50; i++) {
      const catIdx = Math.floor(Math.random() * categories.length);
      const priorityIdx = Math.floor(Math.random() * priorities.length);
      const statusIdx = Math.floor(Math.random() * statuses.length);
      const subjectIdx = Math.floor(Math.random() * subjects.length);
      const confidence = Math.floor(Math.random() * 30) + 70;
      const tokens = Math.floor(Math.random() * 500) + 100;
      const latency = Math.floor(Math.random() * 2000) + 200;
      const daysAgo = Math.floor(Math.random() * 30);
      const createdAt = new Date(Date.now() - daysAgo * 86400000);

      const ticket = {
        ticketId: `TKT-${String(1000 + i).padStart(4, "0")}`,
        subject: subjects[subjectIdx],
        description: `Detailed description for ticket ${i}. The user is experiencing issues with ${subjects[subjectIdx].toLowerCase()}.`,
        category: categories[catIdx].cat,
        subcategory: categories[catIdx].sub,
        priority: priorities[priorityIdx],
        status: statuses[statusIdx],
        confidence,
        aiModel: "gpt-4o-mini",
        tokensUsed: tokens,
        latency,
        predictionLog: [
          {
            timestamp: createdAt,
            model: "gpt-4o-mini",
            tokens,
            latency,
            confidence,
            rawResponse: {},
          },
        ],
        createdAt,
        updatedAt: createdAt,
      };

      tickets.push(ticket);
      logs.push({
        ticketId: ticket.ticketId,
        subject: ticket.subject,
        aiModel: "gpt-4o-mini",
        tokens,
        latency,
        confidence,
        category: ticket.category,
        priority: ticket.priority,
        rawResponse: {},
        createdAt,
      });
    }

    await Ticket.insertMany(tickets);
    await PredictionLog.insertMany(logs);

    return NextResponse.json({ success: true, seeded: tickets.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
