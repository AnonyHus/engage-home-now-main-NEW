import { useEffect, useState } from "react";
import saveImageToDB from "../../services/saveImageToDB";
import { fetchServices } from "../../services/fetchServices";
import Swal from "sweetalert2";
import "../../styles/ImageUploadPage.css"; // (create for custom styles)

const ImageUploadPage = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const CLOUD_NAME = "dtvdu1fqj";
  const UPLOAD_PRESET = "uploads";

  useEffect(() => {
    fetchServices().then((data) => setServices(Array.isArray(data) ? data : []));
  }, []);

  const uploadToCloudinary = async () => {
    if (!selectedServiceId || !selectedFile) {
      Swal.fire("Select a service and image.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const cloudData = await cloudRes.json();
      if (!cloudData.secure_url) throw new Error("Upload failed");

      const imageUrl = cloudData.secure_url;
      const dbResult = await saveImageToDB(imageUrl, selectedServiceId, title);
      if (!dbResult.success) {
        Swal.fire("Failed to save image info to DB.", "", "error");
        return;
      }
      Swal.fire("Image uploaded and saved successfully!", "", "success");
      setPreview(null);
      setTitle("");
      setSelectedFile(null);
    } catch (err) {
      Swal.fire("Something went wrong.", "", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTitle(file.name.replace(/\.[^/.]+$/, "")); // Remove extension
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Image</h2>
      <select
        value={selectedServiceId}
        onChange={(e) => setSelectedServiceId(e.target.value)}
        className="modern-select"
      >
        <option value="">-- Select a service --</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <label className="upload-label">
        <input
          type="file"
          accept="image/*"
          disabled={uploading || !selectedServiceId}
          onChange={handleFileChange}
          hidden
        />
        <span
          className={`upload-btn${!selectedServiceId ? " disabled" : ""}`}
          style={{ pointerEvents: !selectedServiceId ? "none" : "auto", opacity: !selectedServiceId ? 0.5 : 1 }}
        >
          {uploading ? "Uploading..." : "Choose Image"}
        </span>
      </label>
      {preview && (
        <div className="preview-card">
          <img src={preview} alt="Preview" className="preview-img" />
          <p className="preview-title">{title}</p>
        </div>
      )}
      <button
        className="upload-btn"
        style={{ marginTop: "1rem", width: "100%" }}
        onClick={uploadToCloudinary}
        disabled={uploading || !selectedFile || !selectedServiceId}
      >
        {uploading ? "Uploading..." : "Submit"}
      </button>
    </div>
  );
};

export default ImageUploadPage;
