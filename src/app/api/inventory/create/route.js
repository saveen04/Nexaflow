import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inventory from "@/models/Inventory";
import ErrorLog from "@/models/ErrorLog";

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const nodeId = `NODE_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    const inventory = await Inventory.create({
      nodeId,
      ...data,
      available: data.capacity,
    });

    return NextResponse.json({
      success: true,
      message: "Inventory node initialized successfully",
      inventory,
    });
  } catch (error) {
    console.error("Inventory Creation Error:", error);
    
    await ErrorLog.create({
      logId: `ERR_${Date.now()}`,
      type: "database",
      severity: "error",
      message: error.message || "Failed to initialize inventory node",
      stack: error.stack,
    });

    return NextResponse.json(
      { success: false, message: "Could not initialize inventory node" },
      { status: 500 }
    );
  }
}
