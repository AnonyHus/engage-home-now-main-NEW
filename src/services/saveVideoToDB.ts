import { db } from "./sqliteClient";

const saveServiceVideoToDB = async (videoUrl: string, serviceId: number) => {
  const { data, error } = await db
    .from("services")
    .update({ video_url: videoUrl })
    .eq('id', serviceId);

    if (error) {
      console.error("update error:", error);
      return { success: false, error };
    }
    
    return { success: true, data };
};

export default saveServiceVideoToDB;