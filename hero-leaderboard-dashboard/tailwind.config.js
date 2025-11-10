/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      neon: {
        cyan: "#00eaff",
      },
    },
  },
},
  plugins: [],
};
