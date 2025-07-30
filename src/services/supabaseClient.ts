import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xeevjagmkikovmkwmezf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlZXZqYWdta2lrb3Zta3dtZXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1ODA2NDIsImV4cCI6MjA2OTE1NjY0Mn0.IBVzKaosYKYfwfyrqbInGpKOPEuVzTZWCKCOTmsA4cg";

export const supabase = createClient(supabaseUrl, supabaseKey);
