import Link from "next/link";

const projectMap = {
  "aurora-ui-kit": {
    id: "aurora-ui-kit",
    name: "Aurora UI Kit",
    status: "review",
    score: "94%",
    summary: "Design system and onboarding polish for the workspace experience.",
    owner: "Design Studio",
    nextMilestone: "Polish onboarding interactions",
    timeline: "2 weeks",
    metrics: ["UI consistency: 96%", "Accessibility: 92%", "Delivery confidence: 89%"],
  },
  "neon-crm": {
    id: "neon-crm",
    name: "Neon CRM",
    status: "building",
    score: "87%",
    summary: "Customer workflow dashboard for sales and lifecycle automation.",
    owner: "Growth Ops",
    nextMilestone: "Connect automation sequences",
    timeline: "5 weeks",
    metrics: ["Flow completion: 83%", "Response speed: 91%", "Automation coverage: 80%"],
  },
  "moonlight-api": {
    id: "moonlight-api",
    name: "Moonlight API",
    status: "live",
    score: "99%",
    summary: "Shared API routing and deployment automation for app services.",
    owner: "Platform Team",
    nextMilestone: "Increase observability coverage",
    timeline: "ongoing",
    metrics: ["Uptime: 99.9%", "Latency: 210ms", "Error rate: 0.2%"],
  },
} as const;

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projectMap[params.id as keyof typeof projectMap];

  if (!project) {
    return (
      <main className="page-shell inner-page-shell">
        <div className="empty-state">
          <h2>Project not found</h2>
          <Link href="/projects" className="primary-btn">View projects</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell inner-page-shell">
      <aside className="sidebar">
        <div className="brand-wrap">
          <div className="brand-mark">W</div>
          <div>
            <p className="eyebrow">WORKSPACE</p>
            <h1>Waifu WorksCloud</h1>
          </div>
        </div>

        <nav className="nav" aria-label="Project navigation">
          <Link href="/" className="nav-item">Overview</Link>
          <Link href="/projects" className="nav-item active">Projects</Link>
          <Link href="/login" className="nav-item">Agents</Link>
          <Link href="/login" className="nav-item">Deploys</Link>
        </nav>
      </aside>

      <section className="content">
        <header className="topbar page-topbar">
          <div>
            <p className="eyebrow">PROJECT DETAIL</p>
            <h2>{project.name}</h2>
          </div>
          <div className="topbar-actions">
            <Link href="/projects" className="ghost-btn">All projects</Link>
            <button className="primary-btn">Open task board</button>
          </div>
        </header>

        <div className="detail-layout">
          <div className="panel detail-panel">
            <div className="panel-head">
              <h3>{project.name}</h3>
              <span className={`project-badge ${project.status === "review" ? "cyan" : project.status === "building" ? "violet" : "pink"}`}>{project.status}</span>
            </div>
            <p className="detail-summary">{project.summary}</p>

            <div className="big-score-row">
              <div>
                <span>Completion</span>
                <strong>{project.score}</strong>
              </div>
              <div>
                <span>Timeline</span>
                <strong>{project.timeline}</strong>
              </div>
            </div>

            <div className="mini-progress large-progress">
              <span style={{ width: project.score }} />
            </div>

            <div className="detail-metrics">
              <h4>Key metrics</h4>
              <ul>
                {project.metrics.map((metric) => <li key={metric}>{metric}</li>)}
              </ul>
            </div>
          </div>

          <div className="panel side-panel">
            <div className="panel-head">
              <h3>Project info</h3>
            </div>
            <div className="info-list">
              <div><span>Owner</span><strong>{project.owner}</strong></div>
              <div><span>Next milestone</span><strong>{project.nextMilestone}</strong></div>
              <div><span>Current phase</span><strong>{project.status}</strong></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
