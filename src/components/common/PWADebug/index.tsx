import { useState, useEffect } from "react";
import { usePWA } from "@/hooks/usePWA";

interface PWADebugProps {
  className?: string;
}

const PWADebug: React.FC<PWADebugProps> = ({ className = "" }) => {
  const {
    isInstallable,
    isInstalled,
    isStandalone,
    isUpdateAvailable,
    showInstallPrompt,
    checkForUpdates,
    skipWaiting,
    forceUpdate,
    getAppVersion,
  } = usePWA();

  const [isVisible, setIsVisible] = useState(false);
  const [versionInfo, setVersionInfo] = useState<string>("Loading...");

  useEffect(() => {
    // Get version info on mount
    getAppVersion().then((version) => {
      setVersionInfo(version);
    });
  }, [getAppVersion]);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCheckForUpdates = async () => {
    console.log("PWADebug: Checking for updates...");
    await checkForUpdates();
  };

  const handleTriggerUpdate = () => {
    console.log("PWADebug: Triggering fake update...");
    // Simulate update available for testing
    window.dispatchEvent(new CustomEvent("pwa-test-update"));
  };

  if (!isVisible) {
    return (
      <div className={`fixed bottom-4 left-4 z-50 ${className}`}>
        <button
          onClick={handleToggleVisibility}
          className="bg-gray-800 text-white px-3 py-2 rounded-full text-xs hover:bg-gray-700 transition-colors"
          title="Show PWA Debug Panel"
        >
          🔧
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 left-4 z-50 ${className}`}>
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">PWA Debug</h3>
          <button
            onClick={handleToggleVisibility}
            className="text-gray-500 hover:text-gray-700 text-xs"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-medium">Installable:</span>
              <span
                className={`ml-1 ${
                  isInstallable ? "text-green-600" : "text-red-600"
                }`}
              >
                {isInstallable ? "✓" : "✗"}
              </span>
            </div>

            <div>
              <span className="font-medium">Installed:</span>
              <span
                className={`ml-1 ${
                  isInstalled ? "text-green-600" : "text-red-600"
                }`}
              >
                {isInstalled ? "✓" : "✗"}
              </span>
            </div>

            <div>
              <span className="font-medium">Standalone:</span>
              <span
                className={`ml-1 ${
                  isStandalone ? "text-green-600" : "text-red-600"
                }`}
              >
                {isStandalone ? "✓" : "✗"}
              </span>
            </div>

            <div>
              <span className="font-medium">Update Available:</span>
              <span
                className={`ml-1 ${
                  isUpdateAvailable ? "text-orange-600" : "text-gray-600"
                }`}
              >
                {isUpdateAvailable ? "⚠" : "✓"}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <div className="mb-2">
              <span className="font-medium">Version:</span>
              <div className="text-xs text-gray-600 break-all">
                {versionInfo}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200 space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={showInstallPrompt}
                disabled={!isInstallable}
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Install
              </button>

              <button
                onClick={handleCheckForUpdates}
                className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition-colors"
              >
                Check Updates
              </button>

              <button
                onClick={skipWaiting}
                disabled={!isUpdateAvailable}
                className="bg-orange-500 text-white px-2 py-1 rounded text-xs hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update
              </button>

              <button
                onClick={forceUpdate}
                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
              >
                Force Update
              </button>
            </div>

            <button
              onClick={handleTriggerUpdate}
              className="w-full bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600 transition-colors"
            >
              Trigger Test Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWADebug;
