import { db } from "./sqliteClient";

const fetchImagesByServiceId = async (serviceId: number) => {
  const { data, error } = await (db
    .from("Images")
    .select("image_url,is_screen")
    .eq("service_id", serviceId)
    .order("image_order", { ascending: true }) as any); // sort by image_order

  if (error) {
    console.error("Error fetching images:", error);
    return [];
  }

  return data;
};

export default fetchImagesByServiceId;
