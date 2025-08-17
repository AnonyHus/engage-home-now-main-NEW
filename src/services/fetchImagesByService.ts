
import { supabase } from "./supabaseClient";


  const fetchImagesByServiceId = async (serviceId) => {
    const { data, error } = await supabase
      .from("Images")
      .select("image_url,is_screen")
      .eq("service_id", serviceId);
  
    if (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  
    return data;
  };


export default fetchImagesByServiceId;
