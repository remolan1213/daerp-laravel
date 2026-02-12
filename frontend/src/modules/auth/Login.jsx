import { useState } from "react";
import { api } from "../../shared/api/client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Login failed. Verify your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-screen">
      <section className="login-aside">
        <div>
          <div className="login-kicker">DAERP Platform</div>
          <h1 className="login-title">Secure payroll operations for teams that move fast.</h1>
          <p className="login-copy">
            Manage attendance, process payroll, and monitor employee data in one consolidated workspace.
          </p>
        </div>
        <p className="muted">Version 2.0 • Payroll Administration Portal</p>
      </section>

      <section className="login-panel">
        <h2>Sign in</h2>
        <p className="muted">Use your authorized account to access payroll modules.</p>

        <form onSubmit={handleLogin} style={{ marginTop: 18 }}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field" style={{ marginTop: 10 }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="button primary"
            type="submit"
            style={{ marginTop: 16, width: "100%" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {error && <div className="status error">{error}</div>}
        <p className="login-foot">
          Support: payroll operations and HR administrators only.
        </p>
      </section>
    </div>
  );
}
