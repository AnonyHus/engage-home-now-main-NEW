import { title } from "process";
import { supabase } from "./supabaseClient";


const saveServiceVideoToDB = async (videoUrl,serviceId) => {
  const { data, error } = await supabase
    .from("services")
    .update({ video_url: videoUrl })
    .eq('id', serviceId);

    if (error) {
      
      console.error("update error:",  error.message, error.details);
      return { success: false, error };
    }
    
    return { success: true, data };
  };

export default saveServiceVideoToDB;