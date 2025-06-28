import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = "transition-all duration-300 ease-in-out transform";
    const visibilityStyles = isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-2";

    let colorStyles = "";
    switch (type) {
      case "success":
        colorStyles = "bg-green-500 text-white";
        break;
      case "error":
        colorStyles = "bg-red-500 text-white";
        break;
      case "info":
        colorStyles = "bg-blue-500 text-white";
        break;
    }

    return `${baseStyles} ${visibilityStyles} ${colorStyles}`;
  };

  return (
    <div
      className={`px-4 py-3 rounded-lg shadow-lg max-w-sm mx-auto ${getToastStyles()}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-[500] leading-[18px]">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-3 text-white hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Toast;
