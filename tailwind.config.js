/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        typing: "typing 3s steps(20, end) infinite",
      },

      keyframes: {
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [tailwindScrollbar],
};
