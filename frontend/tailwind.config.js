/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideDownFade: {
          "0%": {
            opacity: 0,
            transform: "translate(-50%, -20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%, 0)",
          },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "slide-down-fade": "slideDownFade 0.2s ease-out forwards",
        "fade-out": "fadeOut 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
