import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert IT support ticket classification AI. Analyze the ticket and return a JSON classification.

Categories and subcategories:
- Bus Booking: Reservation, Cancellation, Seat Change, Schedule Inquiry, Route Information
- Train Booking: Seat Selection, PNR Status, Delayed Train, Fare Inquiry, Station Help
- Movie Booking: Ticket Selection, Refund, Theater Info, Food & Drinks, Show Timing
- Customer Support: Technical Issue, App Bug, UI Problem, Feedback, Complaint
- Account & Access: Login Problem, Signup Issue, Security, Password Reset, Profile Update
- Billing & Payment: Payment Failure, Invoice, Refund Status, Pricing, Promos

Priority levels:
- critical: System down, data loss, security breach, production outage
- high: Major feature broken, significant impact on work
- medium: Partial degradation, workaround available
- low: Minor issue, cosmetic, nice-to-have

Return ONLY valid JSON in this exact format:
{
  "category": "string",
  "subcategory": "string",
  "priority": "critical|high|medium|low",
  "confidence": number (0-100),
  "reasoning": "string",
  "suggestedActions": ["string", "string"]
}`;

export async function classifyTicket(
  ticketId,
  subject,
  description,
  model = "gpt-4o-mini"
) {
  const start = Date.now();

  const response = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Ticket ID: ${ticketId}\nSubject: ${subject}\nDescription: ${description}`,
      },
    ],
    temperature: 0.1,
    response_format: { type: "json_object" },
  });

  const latency = Date.now() - start;
  const tokensUsed = response.usage?.total_tokens || 0;
  const content = response.choices[0]?.message?.content || "{}";

  let parsed = {};
  try {
    parsed = JSON.parse(content);
  } catch {
    parsed = {
      category: "General Inquiry",
      subcategory: "Information Request",
      priority: "low",
      confidence: 50,
      reasoning: "Failed to parse AI response",
      suggestedActions: [],
    };
  }

  return {
    category: parsed.category || "General Inquiry",
    subcategory: parsed.subcategory || "Information Request",
    priority: parsed.priority || "low",
    confidence: parsed.confidence || 50,
    reasoning: parsed.reasoning || "",
    suggestedActions: parsed.suggestedActions || [],
    tokensUsed,
    latency,
    model,
    rawResponse: response,
  };
}
