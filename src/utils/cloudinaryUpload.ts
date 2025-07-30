const uploadToCloudinary = async (file: File,preset: string) : Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
  
    const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    return data.secure_url;
  };
  
  export default uploadToCloudinary;
  