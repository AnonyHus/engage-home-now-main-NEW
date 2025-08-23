import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import saveOutdoorLocationImageToDB from "../../services/saveOutdoorLocationImageToDB";
import {getNextImageOrder} from "../../services/getNextImageOrder";

const OutdoorImageUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [outdoorSlug, setOutdoorSlug] = useState<"static" | "screen" | "">("");
  const [imgOrder, setImgOrder] = useState<number | null>(null);
  const [orderLoading, setOrderLoading] = useState(false);

  const [pixel, setPixel] = useState("");
  const [duration, setDuration] = useState("");

  const CLOUD_NAME = "dtvdu1fqj";
  const UPLOAD_PRESET = "uploads";


  useEffect(() => {
    if (outdoorSlug) {
      setOrderLoading(true);
      getNextImageOrder(outdoorSlug).then(res => {
        if (res.success) setImgOrder(res.nextOrder);
        else setImgOrder(1); // fallback
        setOrderLoading(false);
      });
    } else {
      setImgOrder(null);
    }
  }, [outdoorSlug]);

  
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
    // If slug is screen, ensure pixel and duration are filled
    if (outdoorSlug === "screen" && (!pixel || !duration)) {
      Swal.fire("Please provide pixel and duration for screen type.");
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
        imgOrder,
        outdoorSlug === "screen" ? pixel : null,
        outdoorSlug === "screen" ? duration : null
      );

      if (result.success) {
        Swal.fire("Image uploaded and saved!", "", "success");
        setSelectedFile(null);
        setPreview(null);
        setLocation("");
        setSize("");
        setType("");
        setOutdoorSlug("");
        setPixel("");
        setDuration("");
        if (outdoorSlug) {
          const res = await getNextImageOrder(outdoorSlug);
          if (res.success) setImgOrder(res.nextOrder);
        }
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

          {outdoorSlug === "screen" && (
            <>
              <input
                type="text"
                placeholder="Pixel"
                value={pixel}
                onChange={(e) => setPixel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </>
          )}
          <input
            type="number"
            placeholder="Image Order"
            value={imgOrder}
            readOnly
            disabled={orderLoading || !outdoorSlug}
            onChange={(e) => setImgOrder(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {orderLoading && <p className="text-sm text-gray-500">Loading order...</p>}

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
            disabled={
              uploading ||
              !selectedFile ||
              !location ||
              !size ||
              !type ||
              !outdoorSlug ||
              (outdoorSlug === "screen" && (!pixel || !duration))
            }
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
