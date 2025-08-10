import { supabase } from './supabaseClient';

export const createMarketNewsPost = async (title: string, eventDate: string, description: string  ,viewHomepage:boolean, Hidden:boolean ) => {
  console.log("Starting createMarketNewsPost with title:", title); // Debug log

  const formattedEventDate = new Date(eventDate).toISOString(); // Converts to ISO string format

  try {
    const { data, error } = await supabase
      .from("Market_news")
      .insert([{ title: title, event_date: formattedEventDate, desc: description , viewHomepage:viewHomepage , hidden:Hidden }]);

    console.log("Supabase createMarketNewsPost response:", { data, error }); // Debug log

    if (error) {
      console.error("Error creating market news post:", error.message);
      return { success: false, error: error.message }; // Return error details
    }

    console.log("Market news post created successfully:", data); // Debug log
    return { success: true, data }; // Return success status
  } catch (err) {
    console.error("Exception in createMarketNewsPost:", err);
    return { success: false, error: err.message }; // Return exception details
  }
};
