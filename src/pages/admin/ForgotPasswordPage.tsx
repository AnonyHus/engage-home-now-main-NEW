import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/admin/reset-password", // optional redirect
    });
    if (error) setMsg(error.message);
    else setMsg("If that email exists, a reset link was sent.");
  };

  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" />
      <button onClick={submit}>Send reset link</button>
      <div>{msg}</div>
    </div>
  );
}
