// components/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/services/supabaseClient";

type Ctx = {
  loading: boolean;
  session: import("@supabase/supabase-js").Session | null;
  user: import("@supabase/supabase-js").User | null;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  touchActivity: () => void; // optional helper to bump idle timer
};

const AuthContext = createContext<Ctx>({
  loading: true,
  session: null,
  user: null,
  isAdmin: false,
  signOut: async () => {},
  touchActivity: () => {},
});

const ABSOLUTE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const IDLE_TTL_MS = 30 * 60 * 1000;     // 30 minutes (idle)

const LOGIN_START_KEY = "adminLoginStart";
const LAST_ACTIVITY_KEY = "adminLastActivity";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<import("@supabase/supabase-js").Session | null>(null);
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Activity tracker
  const touchActivity = () => {
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  };

  // Fetch admin role from YOUR users table (fallback to auth metadata if you ever use it)
  const loadAdminRole = async (email: string | null | undefined) => {
    if (!email) return setIsAdmin(false);
    const { data, error } = await supabase
      .from("users")                 // <-- YOUR table
      .select("is_admin")
      .eq("email", email)
      .maybeSingle();
    if (error) {
      console.warn("is_admin lookup failed:", error.message);
      setIsAdmin(false);
      return;
    }
    setIsAdmin(!!data?.is_admin);
  };

  // Validate 30-min absolute or idle timeout
  const expiredByPolicy = () => {
    const now = Date.now();
    const start = parseInt(localStorage.getItem(LOGIN_START_KEY) || "0");
    const last = parseInt(localStorage.getItem(LAST_ACTIVITY_KEY) || "0");
    const absoluteExpired = start > 0 && (now - start) > ABSOLUTE_TTL_MS;
    const idleExpired = last > 0 && (now - last) > IDLE_TTL_MS;
    return absoluteExpired || idleExpired;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(LOGIN_START_KEY);
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    setSession(null);
    setUser(null);
    setIsAdmin(false);
  };

  // Init: get current session then subscribe to changes
  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);

      if (data.session?.user?.email) {
        // (Re)start timers on initial load if not present
        if (!localStorage.getItem(LOGIN_START_KEY)) {
          localStorage.setItem(LOGIN_START_KEY, Date.now().toString());
        }
        if (!localStorage.getItem(LAST_ACTIVITY_KEY)) {
          localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
        }
        await loadAdminRole(data.session.user.email);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user?.email) {
        // Reset timers on new login
        localStorage.setItem(LOGIN_START_KEY, Date.now().toString());
        localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
        await loadAdminRole(newSession.user.email);
      } else {
        // logged out
        localStorage.removeItem(LOGIN_START_KEY);
        localStorage.removeItem(LAST_ACTIVITY_KEY);
        setIsAdmin(false);
      }
    });

    // Global activity listeners to refresh idle timer
    const bump = () => touchActivity();
    window.addEventListener("click", bump);
    window.addEventListener("keydown", bump);
    window.addEventListener("mousemove", bump);
    window.addEventListener("scroll", bump);
    window.addEventListener("touchstart", bump);

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
      window.removeEventListener("click", bump);
      window.removeEventListener("keydown", bump);
      window.removeEventListener("mousemove", bump);
      window.removeEventListener("scroll", bump);
      window.removeEventListener("touchstart", bump);
    };
  }, []);

  // Background poller to enforce expiry (every 15s)
  useEffect(() => {
    const id = window.setInterval(async () => {
      if (!user) return;
      if (expiredByPolicy()) await signOut();
    }, 15000);
    return () => window.clearInterval(id);
  }, [user]);

  const value = useMemo<Ctx>(() => ({
    loading,
    session,
    user,
    isAdmin,
    signOut,
    touchActivity,
  }), [loading, session, user, isAdmin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
