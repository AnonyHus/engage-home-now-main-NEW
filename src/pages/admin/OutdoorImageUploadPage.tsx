import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import saveOutdoorLocationImageToDB from "../../services/saveOutdoorLocationImageToDB";

const OutdoorImageUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [outdoorSlug, setOutdoorSlug] = useState<"static" | "screen" | "">("");
  const [imgOrder, setImgOrder] = useState<number>(1);

  const CLOUD_NAME = "dtvdu1fqj";
  const UPLOAD_PRESET = "uploads";


    // Fetch current maximum order value
    useEffect(() => {
      const fetchMaxOrder = async () => {
        try {
          // Replace with your actual API call to get the max order value
          const response = await fetch('/api/getMaxOrder'); // Example endpoint
          const data = await response.json();
          const maxOrder = data.maxOrder || 0; // Assuming the response has a maxOrder field
          setImgOrder(maxOrder + 1); // Set imgOrder to maxOrder + 1
        } catch (error) {
          console.error("Error fetching max order:", error);
        }
      };
  
      fetchMaxOrder();
    }, []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const uploadToCloudinaryAndSave = async () => {
    if (!selectedFile || !location || !size || !type || !outdoorSlug) {
      Swal.fire("Please fill in all fields and select an image.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const cloudData = await cloudRes.json();
      if (!cloudData.secure_url) throw new Error("Upload to Cloudinary failed.");

      const result = await saveOutdoorLocationImageToDB(
        cloudData.secure_url,
        location,
        size,
        type,
        outdoorSlug,
        imgOrder
      );

      if (result.success) {
        Swal.fire("Image uploaded and saved!", "", "success");
        setSelectedFile(null);
        setPreview(null);
        setLocation("");
        setSize("");
        setType("");
        setOutdoorSlug("");
        setImgOrder(1);
      } else {
        throw new Error("Saving to DB failed.");
      }
    } catch (err) {
      Swal.fire("Something went wrong.", err.message, "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#C30010]">Upload Outdoor Location Image</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <input
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <select
            value={outdoorSlug}
            onChange={(e) => setOutdoorSlug(e.target.value as "static" | "screen")}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">-- Select Slug --</option>
            <option value="static">Static</option>
            <option value="screen">Screen</option>
          </select>

          <input
            type="number"
            placeholder="Image Order"
            value={imgOrder}
            readOnly
            onChange={(e) => setImgOrder(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <label className="block w-full cursor-pointer bg-[#C30010] text-white text-center py-3 rounded-lg hover:bg-red-700 transition">
            {uploading ? "Uploading..." : "Choose Image"}
            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
          </label>

          {preview && (
            <div className="mt-4">
              <img src={preview} alt="Preview" className="w-full rounded-lg shadow-md" />
            </div>
          )}

          <button
            onClick={uploadToCloudinaryAndSave}
            disabled={uploading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutdoorImageUploadPage;
