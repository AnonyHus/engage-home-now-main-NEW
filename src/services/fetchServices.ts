import { db } from "./sqliteClient";

export const fetchServices = async () => {
  console.log("Starting fetchServices..."); // Debug log
  
  try {
    const { data, error } = await (db
      .from("services")
      .select("id,name,slug,Home_Desc,Services_page_desc,features,show_home_page,service_logo") as any);

    console.log("SQLite response:", { data, error }); // Debug log

    if (error) {
      console.error("Error fetching services:", error);
      return [];
    }

    console.log("Returning data:", data); // Debug log
    return data || [];
  } catch (err) {
    console.error("Exception in fetchServices:", err);
    return [];
  }
};

export const getServiceById = async (slug: string) => {
  console.log("Starting getServiceById for slug:", slug); // Debug log
  
  try {
    const { data, error } = await (db
      .from("services")
      .select(` 
        id,
        name,
        slug,
        Home_Desc,
        Services_page_desc,
        features,
        headline,
        headline_desc,
        headline1,
        headline1_desc,
        headline2,
        headline2_desc,
        video_url
      `)
      .eq("slug", slug)
      .maybeSingle() as any);

    console.log("SQLite getServiceById response:", { data, error }); // Debug log

    if (error) {
      console.error("Error fetching service by slug:", error);
      return null;
    }

    console.log("Returning service data:", data); // Debug log
    return data;
  } catch (err) {
    console.error("Exception in getServiceById:", err);
    return null;
  }
};
