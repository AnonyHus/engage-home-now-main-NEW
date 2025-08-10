import { supabase } from "./supabaseClient";

export const fetchMarketNews = async () => {
  console.log("Starting fetchMarketNews..."); // Debug log
  
  try {
    const { data, error } = await supabase
      .from("Market_news")
      .select("id, title, event_date, desc, created_at,view_homepage,hidden")
      .eq("view_homepage", true)
      .eq("hidden", false)
      .order("event_date", { ascending: false });


    console.log("Supabase response:", { data, error }); // Debug log

    if (error) {
      console.error("Error fetching market news:", error.message);
      return [];
    }

    console.log("Returning data:", data); // Debug log
    return data || [];
  } catch (err) {
    console.error("Exception in fetchMarketNews:", err);
    return [];
  }
};

export const getMarketNewsById = async (id) => {
  console.log("Starting getMarketNewsById for ID:", id); // Debug log
  
  try {
    const { data, error } = await supabase
      .from("Market_news")
      .select("id, title, event_date, desc, created_at")
      .eq("id", id)
      .single();

    console.log("Supabase getMarketNewsById response:", { data, error }); // Debug log

    if (error) {
      console.error("Error fetching market news by ID:", error.message);
      return null;
    }

    console.log("Returning market news data:", data); // Debug log
    return data;
  } catch (err) {
    console.error("Exception in getMarketNewsById:", err);
    return null;
  }
};
