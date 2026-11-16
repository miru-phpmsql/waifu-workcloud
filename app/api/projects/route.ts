import { NextResponse } from "next/server";

const projects = [
  { id: "aurora-ui", name: "Aurora UI Kit", status: "review", progress: 94 },
  { id: "neon-crm", name: "Neon CRM", status: "building", progress: 87 },
  { id: "moonlight-api", name: "Moonlight API", status: "live", progress: 99 },
];

export async function GET() {
  return NextResponse.json({ mode: "demo", projects });
}
