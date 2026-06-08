import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ticket from "@/models/Ticket";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const ticket = await Ticket.findOne({ ticketId: id }).lean();
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    return NextResponse.json(ticket);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const ticket = await Ticket.findOneAndUpdate(
      { ticketId: id },
      { $set: body },
      { new: true }
    );
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    return NextResponse.json(ticket);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
