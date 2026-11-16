import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("message" in body) || typeof body.message !== "string") {
    return NextResponse.json({ error: "A message string is required." }, { status: 400 });
  }

  const message = body.message.trim();
  if (!message) return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });

  const lowerMessage = message.toLowerCase();
  const reply = lowerMessage.includes("task")
    ? "This demo workspace has sample tasks. Real task data and coding-agent execution are not connected yet."
    : lowerMessage.includes("project")
      ? "This demo workspace has sample projects. Project data is not persisted yet."
      : "Thanks! This is a simulated response. Connect an AI provider to enable real agent replies.";

  return NextResponse.json({ mode: "demo", reply });
}
