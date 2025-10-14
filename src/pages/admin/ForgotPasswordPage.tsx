import React, { useState } from "react";
import { db } from "../../services/sqliteClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    // Note: Password reset is not implemented in localStorage mode
    // This would require a backend API
    setMsg("Password reset is not available in the current configuration. Please contact an administrator.");
  };

  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" />
      <button onClick={submit}>Send reset link</button>
      <div>{msg}</div>
    </div>
  );
}
