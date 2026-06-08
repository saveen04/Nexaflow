import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ticket from "@/models/Ticket";

export async function GET() {
  try {
    await connectDB();

    const [
      totalTickets,
      criticalCount,
      highPriorityCount,
      resolvedCount,
      categoryDist,
      priorityDist,
      dailyTrend,
      avgConfidence,
    ] = await Promise.all([
      Ticket.countDocuments(),
      Ticket.countDocuments({ priority: "critical" }),
      Ticket.countDocuments({ priority: "high" }),
      Ticket.countDocuments({ status: "resolved" }),
      Ticket.aggregate([
        { $group: { _id: "$category", value: { $sum: 1 } } },
        { $project: { name: "$_id", value: 1, _id: 0 } },
        { $sort: { value: -1 } },
        { $limit: 8 },
      ]),
      Ticket.aggregate([
        { $group: { _id: "$priority", value: { $sum: 1 } } },
        { $project: { name: "$_id", value: 1, _id: 0 } },
      ]),
      Ticket.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            count: { $sum: 1 },
            avgConfidence: { $avg: "$confidence" },
          },
        },
        { $sort: { _id: 1 } },
        { $limit: 30 },
        {
          $project: {
            date: "$_id",
            tickets: "$count",
            confidence: { $round: ["$avgConfidence", 1] },
            _id: 0,
          },
        },
      ]),
      Ticket.aggregate([
        { $group: { _id: null, avg: { $avg: "$confidence" } } },
      ]),
    ]);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const processedToday = await Ticket.countDocuments({
      createdAt: { $gte: todayStart },
    });

    return NextResponse.json({
      kpis: {
        totalTickets,
        processedToday,
        criticalCount,
        highPriorityCount,
        resolvedCount,
        aiAccuracy: avgConfidence[0]?.avg
          ? Math.round(avgConfidence[0].avg)
          : 0,
      },
      categoryDist,
      priorityDist,
      dailyTrend,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
