import Link from "next/link";

const projects = [
  { id: "aurora-ui-kit", name: "Aurora UI Kit", status: "review", score: "94%", summary: "Design system and onboarding polish for the workspace experience." },
  { id: "neon-crm", name: "Neon CRM", status: "building", score: "87%", summary: "Customer workflow dashboard for sales and lifecycle automation." },
  { id: "moonlight-api", name: "Moonlight API", status: "live", score: "99%", summary: "Shared API routing and deployment automation for app services." },
];

export default function ProjectsPage() {
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
            <p className="eyebrow">PROJECT BOARD</p>
            <h2>All active projects</h2>
          </div>
          <Link href="/" className="ghost-btn">Back to overview</Link>
        </header>

        <div className="project-grid">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="panel project-card card-link">
              <div className="panel-head">
                <h3>{project.name}</h3>
                <span className={`project-badge ${project.status === "review" ? "cyan" : project.status === "building" ? "violet" : "pink"}`}>
                  {project.status}
                </span>
              </div>
              <p>{project.summary}</p>
              <div className="mini-progress">
                <span style={{ width: project.score }} />
              </div>
              <div className="project-meta">
                <strong>{project.score}</strong>
                <span>completion</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
