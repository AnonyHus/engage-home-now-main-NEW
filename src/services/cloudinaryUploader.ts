// src/utils/cloudinaryUploader.ts
import axios from "axios";

const CLOUD_NAME = "dtvdu1fqj";
const UPLOAD_PRESET = "uploads";
// 6 MB chunks
const DEFAULT_CHUNK_SIZE = 6 * 1024 * 1024;


export interface UploadResult {
  secure_url: string;
  [key: string]: any;
}

export function uploadImage(
    file: File,
    onProgress?: (pct: number) => void
  ): Promise<UploadResult> {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);
  
    return axios
      .post<UploadResult>(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        form,
        {
          onUploadProgress: (e) => {
            if (onProgress && e.total) {
              onProgress(Math.round((e.loaded * 100) / e.total));
            }
          },
        }
      )
      .then((res) => res.data);
  }
  export function uploadVideo(
    file: File,
    onProgress?: (pct: number) => void,
    chunkSize = DEFAULT_CHUNK_SIZE
  ): Promise<UploadResult> {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);
    form.append("chunk_size", String(chunkSize));
  
    return axios
      .post<UploadResult>(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
        form,
        {
          onUploadProgress: (e) => {
            if (onProgress && e.total) {
              onProgress(Math.round((e.loaded * 100) / e.total));
            }
          },
        }
      )
      .then((res) => res.data);
  }
