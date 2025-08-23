// services/saveOutdoorLocationImageToDB.ts
import { supabase } from "./supabaseClient";

const saveOutdoorLocationImageToDB = async (
  imageUrl: string,
  location: string,
  size: string,
  type: string,
  outdoor_slug: "static" | "screen",
  img_order: number,
  pixel: string,
  duration: string
) => {

  const { data: maxResult, error: maxErr } = await supabase
  .from("outdoor_locations")
  .select("img_order")
  .eq("outdoor_slug", outdoor_slug)
  .order("img_order", { ascending: false })
  .limit(1);

if (maxErr) return { success: false, error: maxErr };

const nextOrder = (maxResult?.[0]?.img_order || 0) + 1;

  const { data, error } = await supabase.from("outdoor_locations").insert([
    {
      img_url: imageUrl,
      location,
      size,
      type,
      outdoor_slug,
      img_order: nextOrder,
      pixel,
      duration
    },
  ]);

  return { success: !error, data, error };
};

export default saveOutdoorLocationImageToDB;
