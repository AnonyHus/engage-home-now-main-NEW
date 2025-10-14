// components/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "@/services/sqliteClient";

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Session = {
  user: User;
  access_token: string;
  expires_at: number;
};

type Ctx = {
  loading: boolean;
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  touchActivity: () => void; // optional helper to bump idle timer
};

const AuthContext = createContext<Ctx>({
  loading: true,
  session: null,
  user: null,
  isAdmin: false,
  signOut: async () => {},
  signIn: async () => ({ success: false }),
  touchActivity: () => {},
});

const ABSOLUTE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const IDLE_TTL_MS = 30 * 60 * 1000;     // 30 minutes (idle)

const LOGIN_START_KEY = "adminLoginStart";
const LAST_ACTIVITY_KEY = "adminLastActivity";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Activity tracker
  const touchActivity = () => {
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  };

  // Fetch admin role from users table
  const loadAdminRole = async (email: string | null | undefined) => {
    if (!email) return setIsAdmin(false);
    const { data, error } = await (db
      .from("users")
      .select("is_admin")
      .eq("email", email) as any)
      .maybeSingle();
    if (error) {
      console.warn("is_admin lookup failed:", error);
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

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await db.auth.signIn(email, password);
      if (error) {
        return { success: false, error };
      }
      
      if (data) {
        // Store session in localStorage
        localStorage.setItem('session', JSON.stringify(data.session));
        localStorage.setItem(LOGIN_START_KEY, Date.now().toString());
        localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
        
        setSession(data.session);
        setUser(data.user);
        await loadAdminRole(data.user.email);
        
        return { success: true };
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    await db.auth.signOut();
    localStorage.removeItem(LOGIN_START_KEY);
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    localStorage.removeItem('session'); // Clear stored session
    setSession(null);
    setUser(null);
    setIsAdmin(false);
  };

  // Init: get current session then subscribe to changes
  useEffect(() => {
    let mounted = true;

    (async () => {
      // Check for stored session in localStorage
      const storedSession = localStorage.getItem('session');
      if (storedSession) {
        try {
          const sessionData = JSON.parse(storedSession);
          if (sessionData.expires_at > Date.now()) {
            setSession(sessionData);
            setUser(sessionData.user);
            await loadAdminRole(sessionData.user.email);
          } else {
            // Session expired
            localStorage.removeItem('session');
          }
        } catch (error) {
          console.error('Error parsing stored session:', error);
          localStorage.removeItem('session');
        }
      }

      setLoading(false);
    })();

    // Mock auth state change subscription
    const mockSubscription = {
      subscription: {
        unsubscribe: () => {}
      }
    };

    // Global activity listeners to refresh idle timer
    const bump = () => touchActivity();
    window.addEventListener("click", bump);
    window.addEventListener("keydown", bump);
    window.addEventListener("mousemove", bump);
    window.addEventListener("scroll", bump);
    window.addEventListener("touchstart", bump);

    return () => {
      mounted = false;
      mockSubscription.subscription.unsubscribe();
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
    signIn,
    touchActivity,
  }), [loading, session, user, isAdmin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
