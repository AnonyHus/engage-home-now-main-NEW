import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { uploadImage, uploadVideo } from "../../services/cloudinaryUploader";
import saveImageToDB from "../../services/saveImageToDB";
import saveServiceVideoToDB from "../../services/saveVideoToDB";
import { fetchServices } from "../../services/fetchServices";

export default function MediaUploadPage() {
  const [services, setServices] = useState<any[]>([]);
  const [mediaType, setMediaType] = useState<"image"|"video">("image");
  const [serviceId, setServiceId] = useState("");
  const [isScreen, setIsScreen] = useState<boolean|null>(null);
  const [files, setFiles] = useState<File[]>([]);
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
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (!selectedFiles.length) return;
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (!files.length || !serviceId) {
      Swal.fire("Select service and at least one file first");
      return;
    }
    // extra check if serviceId=6
    if (serviceId === "6" && isScreen === null) {
      Swal.fire("Please choose Static or Screen first");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const title = f.name.replace(/\.[^/.]+$/, "");

        const result = mediaType === "image"
          ? await uploadImage(f, setProgress)
          : await uploadVideo(f, setProgress);

        if (!result.secure_url) throw new Error("No URL from Cloudinary");

        const dbRes = mediaType === "image"
          ? await saveImageToDB(result.secure_url, serviceId, title, isScreen)
          : await saveServiceVideoToDB(result.secure_url, serviceId);

        if (!dbRes.success) throw new Error("DB save failed");
      }

      Swal.fire("All uploads successful!", "", "success");
      setFiles([]);
    } catch (err) {
      console.error(err);
      Swal.fire("Some uploads failed", "", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload Media</h2>

      {/* Service Dropdown */}
      <select
        value={serviceId}
        onChange={(e) => {
          setServiceId(e.target.value);
          setIsScreen(null); // reset radio when service changes
        }}
        className="w-full mb-4 p-2 border rounded-lg"
      >
        <option value="">-- Choose service --</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* Extra choice only for serviceId=6 */}
      {serviceId === "6" && (
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="screenOption"
              value="false"
              checked={isScreen === false}
              onChange={() => setIsScreen(false)}
            />{" "}
            Static
          </label>
          <label>
            <input
              type="radio"
              name="screenOption"
              value="true"
              checked={isScreen === true}
              onChange={() => setIsScreen(true)}
            />{" "}
            Screen
          </label>
        </div>
      )}

      {/* Media Toggle */}
      <div className="flex mb-4 space-x-2">
        {(["image", "video"] as const).map((type) => (
          <button
            key={type}
            onClick={() => {
              setMediaType(type);
              setFiles([]);
            }}
            className={`flex-1 py-2 rounded-lg text-white ${
              mediaType === type ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* File Input */}
      <input
        type="file"
        multiple
        accept={mediaType === "image" ? "image/*" : "video/mp4"}
        disabled={uploading || !serviceId}
        onChange={onFileChange}
        className="w-full mb-4"
      />

      {/* Preview images */}
      {mediaType === "image" && files.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {files.map((f, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(f)}
              className="w-full rounded-lg"
              alt={`preview-${idx}`}
            />
          ))}
        </div>
      )}

      {/* Progress */}
      {uploading && (
        <progress value={progress} max={100} className="w-full mb-4">
          {`${progress}%`}
        </progress>
      )}

      {/* Submit */}
      <button
        onClick={handleUpload}
        disabled={uploading || !files || !serviceId}
        className="w-full py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
      >
        {uploading ? `Uploading ${progress}%` : "Submit"}
      </button>
    </div>
  );
}
