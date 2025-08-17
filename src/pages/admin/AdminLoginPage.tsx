// AdminLoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import "../../styles/Login.css";

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");        // use email to avoid pre-auth DB reads
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message || "Login failed");
        return;
      }

      const user = data.session?.user;
      if (!user) {
        setError("No session created");
        return;
      }

      // 1) Fast path: check user_metadata.is_admin
      if (user.user_metadata?.is_admin) {
        nav("/admin/upload");
        return;
      }

      // 2) Fallback: check your users table AFTER auth
      const { data: row, error: adminErr } = await supabase
        .from("users")
        .select("is_admin")
        .eq("email", user.email)
        .maybeSingle();

      if (adminErr) {
        setError("Unable to verify admin role");
        return;
      }

      if (!row?.is_admin) {
        setError("Access denied. Admin privileges required.");
        await supabase.auth.signOut();
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
