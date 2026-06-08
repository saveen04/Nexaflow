export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const priority = searchParams.get("priority") || "";
    const status = searchParams.get("status") || "";
    const sort = searchParams.get("sort") || "-createdAt";

    const query = {};
    if (search) {
      query.$or = [
        { ticketId: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (status) query.status = status;

    const total = await Ticket.countDocuments(query);
    const tickets = await Ticket.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-predictionLog")
      .lean();

    return NextResponse.json({
      tickets,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
