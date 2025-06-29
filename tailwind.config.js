/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(15deg)" },
          "20%": { transform: "rotate(-10deg)" },
          "30%": { transform: "rotate(7deg)" },
          "40%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(3deg)" },
          "60%, 100%": { transform: "rotate(0deg)" },
        },
        starpop: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "30%": { transform: "scale(1.4)", opacity: 0.9 },
          "60%": { transform: "scale(0.9)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        ring: "ring 0.8s ease",
        starpop: "starpop 0.5s ease-in-out",
      },

      colors: {},

      screens: {
        "demeter-sm": "390px",
        "demeter-md": "688px",
        "demeter-lg": "1040px",
        "demeter-xl": "1120px",
      },
    },
  },
  plugins: [],
};
