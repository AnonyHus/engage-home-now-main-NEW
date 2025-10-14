import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

import { uploadImage, uploadVideo } from "../../services/cloudinaryUploader";
import saveImageToDB from "../../services/saveImageToDB";
import saveServiceVideoToDB from "../../services/saveVideoToDB";
import { fetchServices } from "../../services/fetchServices";

type FileStatus = "pending" | "uploading" | "success" | "failed";

type Item = {
  id: number;
  file: File;
  preview: string;
  progress: number;
  status: FileStatus;
  error?: string | null;
};

export default function MediaUploadPage() {
  const currentRunRef = useRef<number | null>(null); // NEW: identifies the active upload run

  const [services, setServices] = useState<any[]>([]);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [serviceId, setServiceId] = useState("");
  const [isScreen, setIsScreen] = useState<boolean | null>(null);

  const [items, setItems] = useState<Item[]>([]); // pending / uploading / failed
  const [uploadedItems, setUploadedItems] = useState<Item[]>([]); // gallery of successes

  // authoritative success counter that doesn't decrease when user removes from gallery
  const [successCount, setSuccessCount] = useState(0);

  const [uploading, setUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const idCounter = useRef(1);

  // load services
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

  // maintain overallProgress from items + uploadedItems
  useEffect(() => {
    const combinedProgressSum = items.reduce((s, i) => s + (i.progress || 0), 0) + uploadedItems.length * 100;
    const combinedCount = (items.length + uploadedItems.length) || 1;
    setOverallProgress(Math.round(combinedProgressSum / combinedCount));
  }, [items, uploadedItems]);

  useEffect(() => {
    return () => {
      items.forEach((it) => it.preview && URL.revokeObjectURL(it.preview));
      uploadedItems.forEach((it) => it.preview && URL.revokeObjectURL(it.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (!selectedFiles.length) return;

    // revoke previous previews
    items.forEach((it) => it.preview && URL.revokeObjectURL(it.preview));
    uploadedItems.forEach((it) => it.preview && URL.revokeObjectURL(it.preview));

    const newItems: Item[] = selectedFiles.map((f) => {
      const id = idCounter.current++;
      return {
        id,
        file: f,
        preview: mediaType === "image" ? URL.createObjectURL(f) : "",
        progress: 0,
        status: "pending",
        error: null,
      };
    });

    // reset counts for new batch
    setItems(newItems);
    setUploadedItems([]);
    setSuccessCount(0); // reset authoritative success count
    setOverallProgress(0);
    setTotalCount(newItems.length);
  };

  const compressImageIfNeeded = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressed = await imageCompression(file, options);
      return new File([compressed], file.name, { type: compressed.type });
    } catch (err) {
      console.warn("Compression failed, using original file", err);
      return file;
    }
  };

  // helper: truncate and sanitize displayed filename (keeps chars but limits length)
  const displayName = (name: string) => {
    const trimmed = name.trim();
    if (trimmed.length <= 40) return trimmed;
    return trimmed.slice(0, 37) + "...";
  };

  // Update a single item by id
  const updateItem = (id: number, patch: Partial<Item>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  // Move item to uploadedItems (success) and remove from items
  const moveToUploaded = (id: number) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx === -1) return prev;
      const it = prev[idx];
      setUploadedItems((up) => [...up, { ...it, status: "success", progress: 100 }]);
      // increment successCount here and DON'T decrement it when user removes from gallery
      setSuccessCount((s) => s + 1);
      return prev.filter((p) => p.id !== id);
    });
  };

  // Remove uploaded item from uploaded gallery (optional cleanup)
  // NOTE: this no longer affects successCount -- successCount tracks historical successes
  const removeUploadedItem = (id: number) => {
    setUploadedItems((prev) => {
      const next = prev.filter((p) => p.id !== id);
      // revoke preview URL of removed thumbnail
      const removed = prev.find((p) => p.id === id);
      if (removed && removed.preview) URL.revokeObjectURL(removed.preview);
      return next;
    });
  };

  // Upload a single item (snapshot) and update state accordingly
  const uploadSingleItem = async (snapshot: Item) => {
    // mark uploading in state (if the item still exists)
    updateItem(snapshot.id, { status: "uploading", progress: 0, error: null });

    try {
      let fileToUpload = snapshot.file;
      if (mediaType === "image") {
        fileToUpload = await compressImageIfNeeded(snapshot.file);
      }

      const title = snapshot.file.name.replace(/\.[^/.]+$/, "");

      const onProgress = (p: number) => {
        updateItem(snapshot.id, { progress: Math.round(p), status: "uploading" });
      };

      const result = mediaType === "image"
        ? await uploadImage(fileToUpload, onProgress)
        : await uploadVideo(fileToUpload, onProgress);

      if (!result || !result.secure_url) {
        throw new Error("No URL from Cloudinary");
      }

      const dbRes = mediaType === "image"
        ? await saveImageToDB(result.secure_url, Number(serviceId), title, isScreen)
        : await saveServiceVideoToDB(result.secure_url, Number(serviceId));
 
      if (!dbRes || !dbRes.success) {
        throw new Error("DB save failed");
      }

      // success: move to uploaded gallery
      moveToUploaded(snapshot.id);
      return { ok: true };
    } catch (err: any) {
      // avoid surfacing raw server text into the UI; keep a generic message and log full error
      console.error(`Upload failed for ${snapshot.file.name}:`, err);
      updateItem(snapshot.id, { status: "failed", error: "Upload failed" });
      return { ok: false, error: err?.message ?? "Upload failed" };
    }
  };

  // concurrency runner: accepts snapshots array and concurrency number
  const runWithConcurrency = async (snapshots: Item[], concurrency = 3) => {
    let idx = 0;
    const results: Array<{ id: number; res: any }> = [];

    const worker = async () => {
      while (true) {
        const i = idx;
        idx += 1;
        if (i >= snapshots.length) break;
        const snap = snapshots[i];
        // upload the snapshot (we don't re-read state here)
        const res = await uploadSingleItem(snap);
        results.push({ id: snap.id, res });
      }
    };

    const workerCount = Math.min(concurrency, snapshots.length);
    const workers = new Array(workerCount).fill(0).map(() => worker());
    await Promise.all(workers);
    return results;
  };

  // Main handler: upload all pending items with concurrency
  const handleUpload = async () => {
    if (!items.length || !serviceId) {
      Swal.fire("Select service and at least one file first");
      return;
    }
    if (serviceId === "6" && isScreen === null) {
      Swal.fire("Please choose Static or Screen first");
      return;
    }

    // start a new upload run and record its id so we only react to results of this run
    const runId = Date.now();
    currentRunRef.current = runId;
    console.debug(`upload run ${runId} started`);

    setUploading(true);

    // take a snapshot of items at start
    const snapshot = items.slice();
    setTotalCount(snapshot.length);
    setSuccessCount(0); // reset for this batch

    const results = await runWithConcurrency(snapshot, 3);

    // if another run started meanwhile, ignore these results (avoids false-toasts)
    if (currentRunRef.current !== runId) {
      console.debug(`upload run ${runId} ignored because a newer run exists (${currentRunRef.current})`);
      return;
    }

    // determine failed ids via results
    const failedIds = results.filter((r) => !(r.res && r.res.ok)).map((r) => r.id);
    const failedNames = snapshot
      .map((s, i) => ({ id: s.id, label: `${i + 1}) ${displayName(s.file.name)}` }))
      .filter((x) => failedIds.includes(x.id))
      .map((x) => x.label);

    if (failedNames.length) {
      Swal.fire({ icon: "error", title: `${failedNames.length} file(s) failed`, text: `Failed: ${failedNames.join(", ")}` });
    } else {
      Swal.fire("All uploads successful!", "", "success");
    }

    setUploading(false);
  };

  // Retry a specific failed item
  const retryItem = async (id: number) => {
    const snap = items.find((i) => i.id === id);
    if (!snap) return;

    const runId = Date.now();
    currentRunRef.current = runId;
    console.debug(`retry run ${runId} started for id ${id}`);

    setUploading(true);
    const res = await uploadSingleItem(snap);

    if (currentRunRef.current !== runId) {
      console.debug(`retry run ${runId} ignored because a newer run exists (${currentRunRef.current})`);
      return;
    }

    if (!(res && (res as any).ok)) {
      Swal.fire({ icon: "error", title: `Upload failed`, text: displayName(snap.file.name) });
    } else {
      Swal.fire("Upload successful", "", "success");
    }

    setUploading(false);
  };

  // Retry all failed items with concurrency
  const retryAllFailed = async () => {
    const failed = items.filter((i) => i.status === "failed");
    if (!failed.length) return;

    const runId = Date.now();
    currentRunRef.current = runId;
    console.debug(`retry-all run ${runId} started for ${failed.length} items`);

    setUploading(true);
    const results = await runWithConcurrency(failed, 3);

    if (currentRunRef.current !== runId) {
      console.debug(`retry-all run ${runId} ignored because a newer run exists (${currentRunRef.current})`);
      return;
    }

    const failedIds = results.filter((r) => !(r.res && r.res.ok)).map((r) => r.id);
    const stillFailed = items.filter((i) => failedIds.includes(i.id));
    if (stillFailed.length) {
      Swal.fire({ icon: "error", title: `${stillFailed.length} file(s) still failed`, text: `Failed: ${stillFailed.map((i) => displayName(i.file.name)).join(", ")}` });
    } else {
      Swal.fire("All retries successful!", "", "success");
    }
    setUploading(false);
  };

  // completedCount should use the authoritative successCount
  const completedCount = successCount;

  const startDisabled = uploading || items.length === 0 || !serviceId || (serviceId === "6" && isScreen === null);
  const retryAllDisabled = uploading || !items.some((i) => i.status === "failed") || (serviceId === "6" && isScreen === null);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload Media</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Service Dropdown */}
        <select
          value={serviceId}
          onChange={(e) => {
            setServiceId(e.target.value);
            setIsScreen(null);
          }}
          className="w-full p-2 border rounded-lg"
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
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="screenOption" value="false" checked={isScreen === false} onChange={() => setIsScreen(false)} />
              Static
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="screenOption" value="true" checked={isScreen === true} onChange={() => setIsScreen(true)} />
              Screen
            </label>
          </div>
        )}
      </div>

      {/* Media Toggle */}
      <div className="flex mb-4 space-x-2">
        {(["image", "video"] as const).map((type) => (
          <button
            key={type}
            onClick={() => {
              // clear state when switching types
              items.forEach((it) => it.preview && URL.revokeObjectURL(it.preview));
              uploadedItems.forEach((it) => it.preview && URL.revokeObjectURL(it.preview));
              setItems([]);
              setUploadedItems([]);
              setTotalCount(0);
              setOverallProgress(0);
              setMediaType(type);
            }}
            className={`flex-1 py-2 rounded-lg text-white ${mediaType === type ? "bg-blue-600" : "bg-gray-400"}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* File Input */}
      <input type="file" multiple accept={mediaType === "image" ? "image/*" : "video/mp4"} disabled={uploading || !serviceId} onChange={onFileChange} className="w-full mb-4" />

      {/* Action buttons */}
      <div className="flex gap-2 mb-4">
        <button onClick={handleUpload} disabled={startDisabled} className="flex-1 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50">
          {uploading ? `Uploading ${overallProgress}%` : "Start Upload"}
        </button>
        <button onClick={retryAllFailed} disabled={retryAllDisabled} className="py-2 px-4 bg-yellow-500 text-white rounded-lg disabled:opacity-50">
          Retry All Failed
        </button>
      </div>

      {/* Uploading summary */}
      {uploading && (
        <div className="mb-4">
          <div className="mb-2 font-medium">Uploading {completedCount}/{totalCount} files</div>
          <progress value={overallProgress} max={100} className="w-full mb-2" />
        </div>
      )}

      {/* Preview area for pending/failed items (images) */}
      {mediaType === "image" && items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {items.map((it) => (
            <div key={it.id} className="relative border rounded-lg overflow-hidden">
              <img src={it.preview} className="w-full h-40 object-cover" alt={it.file.name} />

              {/* Failed overlay - retry icon */}
              {it.status === "failed" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <button onClick={() => retryItem(it.id)} className="bg-white p-2 rounded-full shadow" title="Retry upload">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6M4 14a8 8 0 0116 0M20 10a8 8 0 00-16 0" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="p-2">
                <div className="flex justify-between items-center text-sm mb-1">
                  <div className="truncate max-w-xs">{it.file.name}</div>
                  <div className="ml-2">{it.status === "uploading" ? `${it.progress}%` : it.status}</div>
                </div>
                <progress value={it.progress} max={100} className="w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video list (if any) */}
      {mediaType === "video" && items.length > 0 && (
        <div className="space-y-3 mb-6">
          {items.map((it) => (
            <div key={it.id} className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <div className="truncate max-w-xs">{it.file.name}</div>
                <div>{it.status === "uploading" ? `${it.progress}%` : it.status}</div>
              </div>
              <progress value={it.progress} max={100} className="w-full mt-2" />
              {it.status === "failed" && (
                <div className="mt-2 text-right">
                  <button onClick={() => retryItem(it.id)} className="px-3 py-1 bg-white text-sm rounded shadow">Retry</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Uploaded gallery */}
      {uploadedItems.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Uploaded</h3>
          <div className="grid grid-cols-3 gap-3">
            {uploadedItems.map((u) => (
              <div key={u.id} className="relative border rounded-lg overflow-hidden">
                {u.preview ? <img src={u.preview} className="w-full h-28 object-cover" alt={u.file.name} /> : <div className="w-full h-28 flex items-center justify-center">Uploaded</div>}
                <button onClick={() => removeUploadedItem(u.id)} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow" title="Remove from gallery">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
