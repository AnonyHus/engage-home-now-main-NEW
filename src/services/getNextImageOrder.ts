// services/getNextImageOrder.ts
import { db } from "./sqliteClient";

export const getNextImageOrder = async (outdoor_slug: "static" | "screen") => {
  const { data, error } = await (db
    .from("outdoor_locations")
    .select("img_order")
    .eq("outdoor_slug", outdoor_slug)
    .order("img_order", { ascending: false })
    .limit(1) as any);

  if (error) return { success: false, error };

  const maxOrder = data.length > 0 ? data[0].img_order : 0;
  return { success: true, nextOrder: maxOrder + 1 };
};
