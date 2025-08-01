// src/pages/MediaUploadPage.tsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { uploadImage, uploadVideo } from "../../services/cloudinaryUploader";
import saveImageToDB from "../../services/saveImageToDB";
import saveServiceVideoToDB from "../../services/saveVideoToDB";
import { fetchServices } from "../../services/fetchServices";


export default function MediaUploadPage() {
  const [services, setServices] = useState([]);
  const [mediaType, setMediaType] = useState<"image"|"video">("image");
  const [serviceId, setServiceId] = useState("");
  const [file, setFile] = useState<File|null>(null);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState<string|null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch((err) => {
        console.error("Failed to load services:", err);
        Swal.fire("Couldn’t load services", "", "error");
      });
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    setFile(f);
    setTitle(f.name.replace(/\.[^/.]+$/, ""));
    setPreview(URL.createObjectURL(f));
  };
  

  const handleUpload = async () => {
    if (!file || !serviceId) {
      Swal.fire("Select service and file first");
      return;
    }
    setUploading(true);
    setProgress(0);

    try {
      const result = mediaType === "image"
        ? await uploadImage(file, setProgress)
        : await uploadVideo(file, setProgress);

      if (!result.secure_url) throw new Error("No URL from Cloudinary");

      // save into your DB
      const dbRes = mediaType === "image"
        ? await saveImageToDB(result.secure_url, serviceId, title)
        : await saveServiceVideoToDB(result.secure_url, serviceId);

      if (!dbRes.success) throw new Error("DB save failed");

      Swal.fire("Upload successful!", "", "success");
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      Swal.fire("Upload failed", "", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Upload {mediaType === "image" ? "Image" : "Video"}
      </h2>

      {/* Media Toggle */}
      <div className="flex mb-4 space-x-2">
        {(["image", "video"] as const).map((type) => (
          <button
            key={type}
            onClick={() => {
              setMediaType(type);
              setFile(null);
              setPreview(null);
            }}
            className={`flex-1 py-2 rounded-lg text-white ${
              mediaType === type ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Service Dropdown */}
      <select
        value={serviceId}
        onChange={(e) => setServiceId(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg"
      >
        <option value="">-- Choose service --</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* File Input */}
      <input
        type="file"
        accept={mediaType === "image" ? "image/*" : "video/mp4"}
        disabled={uploading || !serviceId}
        onChange={onFileChange}
        className="w-full mb-4"
      />

      {/* Preview */}
      {preview && (
        <div className="mb-4">
          {mediaType === "image" ? (
            <img src={preview} className="w-full rounded-lg" alt="preview" />
          ) : (
            <video
              controls
              src={preview}
              className="w-full rounded-lg"
            />
          )}
          <p className="mt-2 text-center text-gray-700">{title}</p>
        </div>
      )}

      {/* Progress */}
      {uploading && (
        <progress
          value={progress}
          max={100}
          className="w-full mb-4"
        >{`${progress}%`}</progress>
      )}

      {/* Submit */}
      <button
        onClick={handleUpload}
        disabled={uploading || !file || !serviceId}
        className="w-full py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
      >
        {uploading ? `Uploading ${progress}%` : "Submit"}
      </button>
    </div>
  );
}