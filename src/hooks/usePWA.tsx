import { useState, useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

export const usePWA = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, _registration) {
      console.log("Service Worker registered at:", swUrl);
    },
    onRegisterError(error) {
      console.error("Service Worker registration error:", error);
    },
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  const dismissUpdate = () => {
    setNeedRefresh(false);
  };

  const dismissOfflineReady = () => {
    setOfflineReady(false);
  };

  return {
    isOnline,
    needRefresh,
    offlineReady,
    handleUpdate,
    dismissUpdate,
    dismissOfflineReady,
  };
};
