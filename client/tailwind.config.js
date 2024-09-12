/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
    },
    extend: {
      width: {
        main: "1280px",
      },
      backgroundColor: {
        main: "#10B981",
        overlay: 'rgba(222,222,222,0.9)'
      },
      colors: {
        main: "#10B981",
      },
    },
  },
  plugins: [],
};


