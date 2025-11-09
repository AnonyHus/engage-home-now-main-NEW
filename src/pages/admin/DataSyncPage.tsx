import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  downloadLocalStorageAsFile, 
  uploadLocalStorageFromFile,
  exportLocalStorage,
  importLocalStorage,
} from "../../utils/localStorageSync";

export default function DataSyncPage() {
  const [syncCode, setSyncCode] = useState("");
  const [showExport, setShowExport] = useState(false);

  const handleExportToFile = () => {
    try {
      downloadLocalStorageAsFile();
      Swal.fire({
        icon: "success",
        title: "Exported!",
        text: "localStorage data has been downloaded as a JSON file",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: error.message,
      });
    }
  };

  const handleImportFromFile = async () => {
    try {
      const success = await uploadLocalStorageFromFile();
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Imported!",
          text: "Data has been imported successfully. Reloading page...",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Import Failed",
          text: "Failed to import data from file",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Import Failed",
        text: error.message,
      });
    }
  };

  const handleShowExportCode = () => {
    const data = exportLocalStorage();
    setSyncCode(data);
    setShowExport(true);
  };

  const handleImportFromCode = () => {
    if (!syncCode.trim()) {
      Swal.fire({
        icon: "warning",
        title: "No Data",
        text: "Please paste the sync code first",
      });
      return;
    }

    try {
      const success = importLocalStorage(syncCode);
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Imported!",
          text: "Data has been imported successfully. Reloading page...",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Import Failed",
          text: "Failed to import data",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Import Failed",
        text: error.message,
      });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(syncCode);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: "Sync code copied to clipboard",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Data Sync Manager
      </h2>

      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Why do I need this?</h3>
        <p className="text-blue-800 text-sm">
          Your app uses localStorage which is origin-specific. Data saved on{" "}
          <code className="bg-blue-100 px-1 rounded">localhost:8080</code> is NOT
          accessible from{" "}
          <code className="bg-blue-100 px-1 rounded">192.168.8.101:8080</code>.
          Use this tool to sync your data between different origins.
        </p>
      </div>

      {/* File-based Export/Import */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          📁 File-Based Sync
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Export your data as a JSON file and import it on another device/origin.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleExportToFile}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            📥 Export to File
          </button>
          <button
            onClick={handleImportFromFile}
            className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            📤 Import from File
          </button>
        </div>
      </div>

      {/* Code-based Export/Import */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          🔑 Code-Based Sync
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Generate a sync code to copy/paste between different origins.
        </p>

        <div className="mb-4">
          <button
            onClick={handleShowExportCode}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium mb-4"
          >
            🔐 Generate Sync Code
          </button>

          {showExport && (
            <div className="relative">
              <textarea
                value={syncCode}
                readOnly
                className="w-full h-40 p-3 border border-gray-300 rounded-lg font-mono text-xs bg-gray-50"
                placeholder="Sync code will appear here..."
              />
              <button
                onClick={handleCopyCode}
                className="absolute top-2 right-2 px-3 py-1 bg-gray-700 text-white text-xs rounded hover:bg-gray-800"
              >
                Copy
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste Sync Code to Import:
          </label>
          <textarea
            value={syncCode}
            onChange={(e) => setSyncCode(e.target.value)}
            className="w-full h-40 p-3 border border-gray-300 rounded-lg font-mono text-xs mb-4"
            placeholder="Paste sync code here..."
          />
          <button
            onClick={handleImportFromCode}
            className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            ⬆️ Import from Code
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">📖 How to use:</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>
            On <strong>localhost</strong>: Click "Export to File" or "Generate Sync
            Code"
          </li>
          <li>
            On <strong>network IP (192.168.8.101)</strong>: Click "Import from File"
            or paste the sync code and click "Import from Code"
          </li>
          <li>The page will reload automatically after successful import</li>
          <li>Your uploaded images and all data will now be visible!</li>
        </ol>
      </div>
    </div>
  );
}
