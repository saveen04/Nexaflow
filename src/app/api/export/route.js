import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ticket from "@/models/Ticket";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "json";

    const tickets = await Ticket.find()
      .sort("-createdAt")
      .select("-predictionLog -__v")
      .lean();

    if (format === "json") {
      return NextResponse.json(tickets);
    }

    // CSV format
    const headers = [
      "ticketId",
      "subject",
      "category",
      "subcategory",
      "priority",
      "status",
      "confidence",
      "aiModel",
      "tokensUsed",
      "latency",
      "createdAt",
    ];

    const rows = tickets.map((t) =>
      headers
        .map((h) => {
          const val = t[h];
          return typeof val === "string" && val.includes(",")
            ? `"${val}"`
            : String(val ?? "");
        })
        .join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="tickets-${Date.now()}.csv"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
