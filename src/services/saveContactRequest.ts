import { db } from "./sqliteClient";

const saveContactRequest = async (name: string, email: string, message: string) => {
  // Get current timestamp in ISO format
  const created_at = new Date().toISOString();
  
  const { data, error } = await db
    .from("contact_requests")
    .insert([{ name, email, message, created_at }]);
  return { data, error };
};

export default saveContactRequest;