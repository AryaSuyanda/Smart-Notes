module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideDownFade: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-down-fade": "slideDownFade 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
