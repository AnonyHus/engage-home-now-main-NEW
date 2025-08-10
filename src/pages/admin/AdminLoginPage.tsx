import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const login = async () => {
    setLoading(true);
    setError("");
  
    try {
      // Static credentials
      const validUsername = "admin";
      const validPassword = "123456"; // <-- your static password
  
      if (username === validUsername && password === validPassword) {
        // Simulate a token
        const fakeToken = "fake-jwt-token-123";
        localStorage.setItem("token", fakeToken);
        nav("/admin/upload");
      } else {
        setError("Invalid username or password.");
      }
    } catch (e) {
      setError("Unexpected error.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    

    <div style={{ maxWidth: 320, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Admin Login</h2>
      <div style={{ marginBottom: 12 }}>
       
        <label>
          Username
          <input 
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Admin"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            autoComplete="username"
            disabled={loading}
          />
        </label>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>
          Password
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            autoComplete="current-password"
            disabled={loading}
          />
        </label>
        <div style={{ marginTop: 4 }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            id="showPassword"
            disabled={loading}
          />
          <label htmlFor="showPassword" style={{ marginLeft: 4 }}>Show Password</label>
        </div>
      </div>
      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
      <button
        onClick={login}
        style={{ width: "100%", padding: 10, fontWeight: 600, background: "#222", color: "#fff", border: "none", borderRadius: 4, cursor: loading ? "not-allowed" : "pointer" }}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default AdminLoginPage;
