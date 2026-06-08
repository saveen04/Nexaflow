import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PredictionLog from "@/models/PredictionLog";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const total = await PredictionLog.countDocuments();
    const logs = await PredictionLog.find()
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-rawResponse")
      .lean();

    return NextResponse.json({
      logs,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
