import React, { useEffect } from "react";

const Toast = ({ open, type = "info", message, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open || !message) return null;

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <span>{message}</span>
      <button type="button" className="toast-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Toast;
