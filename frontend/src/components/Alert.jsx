import React, { useEffect, useState } from "react";

function Alert({ type = "error", message, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setShouldFadeOut(false);

      const timer1 = setTimeout(() => {
        setShouldFadeOut(true);
      }, 2500);

      const timer2 = setTimeout(() => {
        setIsVisible(false); 
      }, 3500); 

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [message]);

  if (!isVisible) return null;

  const baseStyle =
    "fixed top-6 left-1/2 -translate-x-1/2 z-50 p-4 rounded-md text-center font-bold shadow-md max-w-md transition-opacity duration-1000";

  const typeStyle = {
    error: "bg-red-500 text-white",
    success: "bg-blue-500 text-white",
  };

  const animationClass = shouldFadeOut
    ? "animate-fade-out"
    : "animate-slide-down-fade";

  return (
    <div className={`${baseStyle} ${typeStyle[type]} ${animationClass} ${className}`}>
      {message}
    </div>
  );
}

export default Alert;
