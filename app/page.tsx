"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Project = { name: string; status: string; score: string; color: string; id: string; summary: string };
type Task = { title: string; time: string; state: "in progress" | "pending" | "done" };
type Message = { sender: string; text: string };

const initialProjects: Project[] = [
  { id: "aurora-ui-kit", name: "Aurora UI Kit", status: "review", score: "94%", color: "cyan", summary: "Design system and onboarding polish for the workspace experience." },
  { id: "neon-crm", name: "Neon CRM", status: "building", score: "87%", color: "violet", summary: "Customer workflow dashboard for sales and lifecycle automation." },
  { id: "moonlight-api", name: "Moonlight API", status: "live", score: "99%", color: "pink", summary: "Shared API routing and deployment automation for app services." },
];

const initialTasks: Task[] = [
  { title: "Refine onboarding flow", time: "09:30", state: "in progress" },
  { title: "Review frontend agent logs", time: "10:15", state: "pending" },
  { title: "Optimize deployment checklist", time: "11:00", state: "done" },
];

const initialActivity = [
  "Agent found a visual inconsistency in dashboard cards.",
  "New design system tokens synced across components.",
  "Production build passed for release candidate 1.3.",
];

const initialMessages: Message[] = [
  { sender: "System", text: "Demo mode is active. Chat replies are simulated; no AI service is connected yet." },
  { sender: "Aoi", text: "Hi! I can help organize a project plan. Try asking me about tasks or project status." },
];

export default function Home() {
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [activity, setActivity] = useState(initialActivity);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || isSending) return;

    const userMessage = { sender: "You", text };
    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setIsSending(true);
    setNotice("Aoi is thinking...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send message");

      setMessages((current) => [...current, { sender: "Aoi", text: data.reply }]);
      setActivity((current) => [`You asked Aoi: “${text.slice(0, 48)}${text.length > 48 ? "…" : ""}”`, ...current].slice(0, 5));
      setNotice("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setMessages((current) => [...current, { sender: "Aoi", text: `Something went wrong: ${message}` }]);
      setNotice("Chat failed. Demo AI may not be configured yet.");
    } finally {
      setIsSending(false);
    }
  }

  function completeTask(title: string) {
    setTasks((current) => current.map((task) => task.title === title ? { ...task, state: "done" } : task));
    setActivity((current) => [`Task completed: ${title}`, ...current].slice(0, 5));
  }

  function launchFlow() {
    const nextTask: Task = { title: "Review new workflow", time: "Just now", state: "in progress" };
    setTasks((current) => [nextTask, ...current]);
    setActivity((current) => ["A new demo workflow was launched.", ...current].slice(0, 5));
    setNotice("Demo workflow launched — no external agent was started.");
    window.setTimeout(() => setNotice(""), 3500);
  }

  function startProject() {
    const name = `Untitled project ${projects.length + 1}`;
    setProjects((current) => [...current, { id: `project-${Date.now()}`, name, status: "planning", score: "0%", color: "pink", summary: "Fresh workspace for a new idea or delivery stream." }]);
    setActivity((current) => [`Created demo project: ${name}`, ...current].slice(0, 5));
    setNotice(`${name} added to this demo workspace.`);
    window.setTimeout(() => setNotice(""), 3500);
  }

  return (
    <main className="page-shell">
      <aside className="sidebar">
        <div className="brand-wrap">
          <div className="brand-mark">W</div>
          <div><p className="eyebrow">WORKSPACE</p><h1>Waifu WorksCloud</h1></div>
        </div>
        <nav className="nav" aria-label="Main navigation">
          <Link href="/" className="nav-item active">Overview</Link>
          <Link href="/projects" className="nav-item">Projects</Link>
          <Link href="/login" className="nav-item">Agents</Link>
          <Link href="/projects" className="nav-item">Deploys</Link>
          <Link href="/login" className="nav-item">Settings</Link>
        </nav>
        <div className="mini-card accent">
          <span className="tiny-label">DEMO STATUS</span>
          <strong>Local demo workspace</strong>
          <p>{tasks.filter((task) => task.state !== "done").length} unfinished tasks / simulated agent</p>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><p className="eyebrow">CO-PILOT WORKSPACE</p><h2>Creative command center</h2></div>
          <div className="topbar-actions">
            <button className="ghost-btn" onClick={() => { navigator.clipboard?.writeText(window.location.href); setNotice("Page link copied (if clipboard access is allowed)."); }}>Share</button>
            <button className="primary-btn" onClick={launchFlow}>Launch flow</button>
          </div>
        </header>

        {notice && <p className="notice" role="status">{notice}</p>}

        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow accent-text">ANIME-INSPIRED AGENT WORKSPACE</p>
            <h3>Build together with your AI teammates.</h3>
            <p>Organize coding tasks, follow agent activity, and review work in one friendly workspace. This prototype currently runs with local demo data.</p>
            <div className="cta-row">
              <button className="primary-btn large" onClick={startProject}>Start project</button>
              <Link href="/projects" className="ghost-btn large inline-link">View demo</Link>
            </div>
          </div>
          <div className="hero-card">
            <div className="signal-row"><span className="signal-dot" /><span>Workspace: demo mode</span></div>
            <div className="pulse-ring"><div className="pulse-core" /></div>
            <div className="stat-grid">
              <div><p>Sample projects</p><strong>{projects.length}</strong></div>
              <div><p>Open tasks</p><strong>{tasks.filter((task) => task.state !== "done").length}</strong></div>
            </div>
          </div>
        </div>

        <div className="cards-grid">
          {projects.map((project) => (
            <Link key={project.name} href={`/projects/${project.id}`} className="info-card card-link">
              <div className="card-head"><span className={`project-badge ${project.color}`}>{project.status}</span><span className="score">{project.score}</span></div>
              <h4>{project.name}</h4>
              <p className="project-summary">{project.summary}</p>
              <div className="progress-bar"><span style={{ width: project.score }} /></div>
            </Link>
          ))}
        </div>

        <div className="lower-grid">
          <div className="panel task-panel">
            <div className="panel-head"><h4>Current tasks</h4><span>Demo data</span></div>
            <ul>
              {tasks.map((task, index) => (
                <li key={`${task.title}-${index}`} className="task-row">
                  <div><strong>{task.title}</strong><p>{task.time}</p></div>
                  {task.state === "done" ? <span className="task-state done">done</span> : <button className="task-action" onClick={() => completeTask(task.title)}>Mark done</button>}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel chat-panel">
            <div className="panel-head"><h4>Agent chat</h4><span>Aoi · simulated</span></div>
            <div className="messages" aria-live="polite">
              {messages.map((msg, index) => <div key={`${index}-${msg.sender}`} className={`message ${msg.sender === "You" ? "self" : ""}`}><span>{msg.sender}</span><p>{msg.text}</p></div>)}
            </div>
            <form className="composer" onSubmit={sendMessage}>
              <input aria-label="Message Aoi" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask about tasks or projects…" />
              <button type="submit" disabled={!draft.trim() || isSending}>{isSending ? "Sending..." : "Send"}</button>
            </form>
          </div>
        </div>

        <div className="panel activity-panel">
          <div className="panel-head"><h4>Recent activity</h4><span>Local demo</span></div>
          <ul className="activity-list">{activity.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul>
        </div>
      </section>
    </main>
  );
}



























