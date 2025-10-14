// AdminLoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import { db } from "../../services/sqliteClient";
import "../../styles/Login.css";

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const result = await signIn(email, password);

      if (!result.success) {
        setError(result.error || "Login failed");
        return;
      }

      // Check if user is admin
      const { data: userData, error: adminErr } = await (db
        .from("users")
        .select("is_admin")
        .eq("email", email)
        .maybeSingle() as any);

      if (adminErr) {
        setError("Unable to verify admin role");
        return;
      }

      if (!userData?.is_admin) {
        setError("Access denied. Admin privileges required.");
        return;
      }

      nav("/admin/upload");
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Admin Sign In</h2>

        <input
          className="login-input"
          type="email"
          placeholder="Email (admin)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AdminLoginPage;