import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-shell">
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-mark">W</div>
          <div>
            <p className="eyebrow">ACCESS</p>
            <h1>Waifu WorksCloud</h1>
          </div>
        </div>

        <form className="login-form">
          <label>
            <span>Email</span>
            <input type="email" defaultValue="anime.sub@waifu.work" readOnly />
          </label>

          <label>
            <span>Password</span>
            <input type="password" defaultValue="demo-access" readOnly />
          </label>

          <div className="login-actions">
            <Link href="/" className="primary-btn">Login</Link>
            <Link href="/" className="ghost-btn">Cancel</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
