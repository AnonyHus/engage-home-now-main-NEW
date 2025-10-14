import { db } from "./sqliteClient";

const saveImageToDB = async (imageUrl: string, serviceid: number, title: string, is_screen: boolean) => {
  const { data, error } = await db
    .from("Images")
    .insert([{ image_url: imageUrl, title: title, service_id: serviceid, is_screen }]);

    if (error) {
      console.error("Insert error:", error);
      return { success: false, error };
    }
    
    return { success: true, data };
};

export default saveImageToDB;