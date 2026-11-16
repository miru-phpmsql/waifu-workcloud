import { NextResponse } from "next/server";

const tasks = [
  { id: "task-1", title: "Refine onboarding flow", state: "in progress" },
  { id: "task-2", title: "Review frontend agent logs", state: "pending" },
  { id: "task-3", title: "Optimize deployment checklist", state: "done" },
];

export async function GET() {
  return NextResponse.json({ mode: "demo", tasks });
}
