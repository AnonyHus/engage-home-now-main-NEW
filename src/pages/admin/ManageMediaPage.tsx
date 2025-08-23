import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import Swal from "sweetalert2";
import { ArrowUp, ArrowDown } from "lucide-react"; // install lucide-react or use any icon

interface Service {
  id: number;
  name: string;
}

export default function ManageMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [serviceId, setServiceId] = useState<string>("");
  const [isScreen, setIsScreen] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

  const loadServices = async () => {
    const { data, error } = await supabase.from("services").select("id, name").order("name");
    if (!error && data) setServices(data);
  };

  const loadMedia = async () => {
    if (!serviceId) {
      setMedia([]);
      return;
    }
    setLoading(true);
    let query = supabase.from("Images").select("*").order("image_order", { ascending: true });
    query = query.eq("service_id", Number(serviceId));
    if (serviceId === "6" && isScreen !== null) query = query.eq("is_screen", isScreen);
    const { data, error } = await query;
    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      setMedia(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    loadMedia();
  }, [serviceId, isScreen]);

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the media.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });
    if (confirm.isConfirmed) {
      const { error } = await supabase.from("Images").delete().eq("id", id);
      if (error) {
        Swal.fire("Error", error.message, "error");
      } else {
        Swal.fire("Deleted!", "Media deleted successfully.", "success");
        loadMedia();
      }
    }
  };

  // Move item up or down locally
  const handleMove = (index: number, direction: "up" | "down") => {
    setMedia((prev) => {
      const newArr = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newArr.length) return prev;
      [newArr[index], newArr[targetIndex]] = [newArr[targetIndex], newArr[index]];
      return newArr;
    });
  };

 // Save all orders to DB with nullify-then-update logic
const saveAllOrders = async () => {
    setSaving(true); // disable button

    const updates = media.map((m, idx) => ({
      id: m.id,
      order: idx + 1, // using 'order' name internally
    }));
  
    const ids = updates.map(img => img.id);
  
    // 1st step: set all selected image_order to null
    const { error: nullifyError } = await supabase
      .from("Images")
      .update({ image_order: null })
      .in("id", ids);
  
    if (nullifyError) {
      Swal.fire("Error", nullifyError.message, "error");
      return;
    }
  
    // 2nd step: set new orders one by one
    for (const img of updates) {
      const { error } = await supabase
        .from("Images")
        .update({ image_order: img.order })
        .eq("id", img.id);
  
      if (error) {
        Swal.fire("Error", error.message, "error");
        return;
      }
    }
  
    Swal.fire("Success", "Order saved successfully.", "success");
    loadMedia();
    setSaving(false); // re-enable button

  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Uploaded Media</h1>
        <div className="flex gap-3">
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} 
              </option>
            ))}
          </select>
          {serviceId === "6" && (
            <select
              value={isScreen === null ? "" : isScreen ? "true" : "false"}
              onChange={(e) =>
                setIsScreen(e.target.value === "" ? null : e.target.value === "true")
              }
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="true">Screens</option>
              <option value="false">Static</option>
            </select>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : media.length === 0 ? (
        <p className="text-gray-500">No media found.</p>
      ) : (
        <>
          <table className="min-w-full border border-gray-300 bg-white shadow rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Preview</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Order</th>
                <th className="border p-2">Uploaded</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {media.map((item, idx) => (
                <tr key={item.id}>
                  <td className="border p-2 text-center">
                    {item.image_url?.match(/\.(mp4|mov)$/i) ? (
                      <video src={item.image_url} controls className="w-32 h-20 object-cover" />
                    ) : (
                      <img src={item.image_url} alt="" className="w-32 h-20 object-cover" />
                    )}
                  </td>
                  <td className="border p-2 text-center">{item.title ?? "-"}</td>
                  <td className="border p-2 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleMove(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <span>{idx + 1}</span>
                      <button
                        onClick={() => handleMove(idx, "down")}
                        disabled={idx === media.length - 1}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        <ArrowDown size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="border p-2 text-center">
                    {new Date(item.uploaded_at).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-end">
          <button
  onClick={saveAllOrders}
  disabled={saving}
  className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  {saving ? (
    <>
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      Saving...
    </>
  ) : (
    "Save Order"
  )}
            </button>

          </div>
        </>
      )}
    </div>
  );
}
