const projectData = [
  { name: "Aurora UI Kit", status: "review", score: "94%", color: "cyan" },
  { name: "Neon CRM", status: "building", score: "87%", color: "violet" },
  { name: "Moonlight API", status: "live", score: "99%", color: "pink" },
];

const tasks = [
  { title: "Refine onboarding flow", time: "09:30", state: "in progress" },
  { title: "Review frontend agent logs", time: "10:15", state: "pending" },
  { title: "Optimize deployment checklist", time: "11:00", state: "done" },
];

const activity = [
  "Agent found a visual inconsistency in dashboard cards.",
  "New design system tokens synced across components.",
  "Production build passed for release candidate 1.3.",
];

const messages = [
  { sender: "System", text: "Agent ready. Design audit pass: 94%" },
  { sender: "Aoi", text: "I can optimize the workspace layout and polish the task flow." },
  { sender: "You", text: "Please focus on the hero section and compact dashboard readability." },
  { sender: "Aoi", text: "Understood. I’ll update the card hierarchy and reduce visual noise." },
];

export default function Home() {
  return (
    <main className="page-shell">
      <aside className="sidebar">
        <div className="brand-wrap">
          <div className="brand-mark">W</div>
          <div>
            <p className="eyebrow">WORKSPACE</p>
            <h1>Waifu WorksCloud</h1>
          </div>
        </div>

        <nav className="nav">
          <button className="nav-item active">Overview</button>
          <button className="nav-item">Projects</button>
          <button className="nav-item">Agents</button>
          <button className="nav-item">Deploys</button>
          <button className="nav-item">Settings</button>
        </nav>

        <div className="mini-card accent">
          <span className="tiny-label">AI STATUS</span>
          <strong>All systems synced</strong>
          <p>12 active tasks / 3 agents online</p>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">CO-PILOT WORKSPACE</p>
            <h2>Creative command center</h2>
          </div>
          <div className="topbar-actions">
            <button className="ghost-btn">Share</button>
            <button className="primary-btn">Launch flow</button>
          </div>
        </header>

        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow accent-text">NEXT-GEN PRODUCTIVITY</p>
            <h3>Build faster with AI teammates that understand your workflow.</h3>
            <p>
              Turn ideas into polished features with collaborative agent workflows, smart task routing,
              and a cleaner command layer for your product team.
            </p>
            <div className="cta-row">
              <button className="primary-btn large">Start project</button>
              <button className="ghost-btn large">View demo</button>
            </div>
          </div>

          <div className="hero-card">
            <div className="signal-row">
              <span className="signal-dot" />
              <span>Agent sync: online</span>
            </div>
            <div className="pulse-ring">
              <div className="pulse-core" />
            </div>
            <div className="stat-grid">
              <div>
                <p>Productivity</p>
                <strong>+42%</strong>
              </div>
              <div>
                <p>Deploy time</p>
                <strong>2.4h</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="cards-grid">
          {projectData.map((project) => (
            <div key={project.name} className="info-card">
              <div className="card-head">
                <span className={`project-badge ${project.color}`}>{project.status}</span>
                <span className="score">{project.score}</span>
              </div>
              <h4>{project.name}</h4>
              <div className="progress-bar">
                <span style={{ width: project.score }} />
              </div>
            </div>
          ))}
        </div>

        <div className="lower-grid">
          <div className="panel task-panel">
            <div className="panel-head">
              <h4>Current tasks</h4>
              <span>Today</span>
            </div>
            <ul>
              {tasks.map((task) => (
                <li key={task.title} className="task-row">
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.time}</p>
                  </div>
                  <span className={`task-state ${task.state.replace(/\s+/g, "-")}`}>{task.state}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel chat-panel">
            <div className="panel-head">
              <h4>Agent chat</h4>
              <span>Aoi</span>
            </div>
            <div className="messages">
              {messages.map((msg) => (
                <div key={msg.text} className={`message ${msg.sender === "You" ? "self" : ""}`}>
                  <span>{msg.sender}</span>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="composer">
              <input value="Ask the agent to refine the product story..." readOnly />
              <button>Send</button>
            </div>
          </div>
        </div>

        <div className="panel activity-panel">
          <div className="panel-head">
            <h4>Recent activity</h4>
            <span>Live</span>
          </div>
          <ul className="activity-list">
            {activity.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
