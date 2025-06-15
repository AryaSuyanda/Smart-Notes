import React from "react";

function Alert({ type = "error", message }) {
  const baseStyle =
    "fixed top-6 z-50 p-4 rounded-md text-center whitespace-nowrap font-bold shadow-md max-w-md animate-slide-down-fade";

  const typeStyle = {
    error: "bg-red-500 text-white",
    success: "bg-blue-500 text-white",
  };

  if (!message) return null;

  return <div className={`${baseStyle} ${typeStyle[type]}`}>{message}</div>;
}

export default Alert;
