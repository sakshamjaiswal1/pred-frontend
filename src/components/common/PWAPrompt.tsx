import React from "react";
import { usePWA } from "@/hooks/usePWA";

const PWAPrompt: React.FC = () => {
  const {
    needRefresh,
    offlineReady,
    handleUpdate,
    dismissUpdate,
    dismissOfflineReady,
  } = usePWA();

  return (
    <>
      {/* Update Available */}
      {needRefresh && (
        <div className="fixed top-4 left-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 md:left-auto md:right-4 md:max-w-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">Update Available</h3>
              <p className="text-xs opacity-90">
                A new version is ready to install
              </p>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={handleUpdate}
                className="bg-white text-green-600 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
              >
                Update
              </button>
              <button
                onClick={dismissUpdate}
                className="text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offline Ready */}
      {offlineReady && (
        <div className="fixed top-4 left-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50 md:left-auto md:right-4 md:max-w-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">App Ready for Offline</h3>
              <p className="text-xs opacity-90">
                You can now use the app without internet
              </p>
            </div>
            <button
              onClick={dismissOfflineReady}
              className="text-white px-2 py-1 rounded text-xs hover:bg-gray-700 transition-colors ml-4"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAPrompt;
