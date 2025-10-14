import { db } from "./sqliteClient";

const saveContactRequest = async (name: string, email: string, message: string) => {
  const { data, error } = await db
    .from("contact_requests")
    .insert([{ name, email, message }]);
  return { data, error };
};

export default saveContactRequest;