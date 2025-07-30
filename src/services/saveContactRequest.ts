import { supabase } from "./supabaseClient";

const saveContactRequest = async (name: string, email: string, message: string) => {
  const { data, error } = await supabase
    .from("contact_requests")
    .insert([{ name, email, message }]);
  return { data, error };
};

export default saveContactRequest;