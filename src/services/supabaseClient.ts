import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables:");
    throw new Error("Missing Supabase environment variables. Please check your .env.local file.");
}

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey ? "✅ Set" : "❌ Missing");

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,    // keep session in localStorage
      autoRefreshToken: true,  // refresh JWT automatically
      detectSessionInUrl: true
    },
  });
// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
        console.error("Supabase connection test failed:", error);
    } else {
        console.log("✅ Supabase connection successful");
    }
});
