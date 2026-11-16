import { NextResponse } from "next/server";

const FALLBACK_REPLY =
  "This is a demo reply from the local Waifu WorksCloud workspace. Add OPENAI_API_KEY to enable real AI chat.";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ mode: "demo", reply: FALLBACK_REPLY });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Aoi, a helpful AI workspace assistant. Keep replies concise, practical, and professional.",
          },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "OpenAI request failed." },
        { status: response.status || 500 }
      );
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ mode: "live", reply: reply || FALLBACK_REPLY });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
