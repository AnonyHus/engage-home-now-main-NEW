import { title } from "process";
import { supabase } from "./supabaseClient";

const saveImageToDB = async (imageUrl, serviceid,title) => {
  const { data, error } = await supabase
    .from("Images")
    .insert([{ image_url: imageUrl, title: title,service_id: serviceid }]);

    if (error) {
      
      console.error("Insert error:",  error.message, error.details);
      return { success: false, error };
    }
    
    return { success: true, data };
  };

export default saveImageToDB;