// services/saveOutdoorLocationImageToDB.ts
import { supabase } from "./supabaseClient";

const saveOutdoorLocationImageToDB = async (
  imageUrl: string,
  location: string,
  size: string,
  type: string,
  outdoor_slug: "static" | "screen",
  img_order: number
) => {
  const { data, error } = await supabase.from("outdoor_locations").insert([
    {
      img_url: imageUrl,
      location,
      size,
      type,
      outdoor_slug,
      img_order,
    },
  ]);

  return { success: !error, data, error };
};

export default saveOutdoorLocationImageToDB;
