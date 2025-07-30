import { supabase } from "./supabaseClient";

export const fetchServices = async () => {
  console.log("Starting fetchServices..."); // Debug log
  
  try {
    const { data, error } = await supabase
      .from("services")
      .select("id,name,slug,Home_Desc,path,features");

    console.log("Supabase response:", { data, error }); // Debug log

    if (error) {
      console.error("Error fetching services:", error.message);
      return [];
    }

    console.log("Returning data:", data); // Debug log
    return data || [];
  } catch (err) {
    console.error("Exception in fetchServices:", err);
    return [];
  }
};

export const getServiceById = async (slug: string ) => {
  console.log("Starting getServiceById for ID:", slug); // Debug log
  
  try {
    const { data, error } = await supabase
      .from("services")
      .select(`
        id,
        name,
        slug,
        Home_Desc,
        path,
        features,
        headline,
        headline_desc,
        headline1,
        headline1_desc,
        headline2,
        headline2_desc
      `)
      .eq("slug", slug)
      .single();

    console.log("Supabase getServiceById response:", { data, error }); // Debug log

    if (error) {
      console.error("Error fetching service by ID:", error.message);
      return null;
    }

    console.log("Returning service data:", data); // Debug log
    return data;
  } catch (err) {
    console.error("Exception in getServiceById:", err);
    return null;
  }
};
