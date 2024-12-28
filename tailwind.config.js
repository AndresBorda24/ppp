/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aso-primary': "#047F8C",
        'aso-secondary': "#025E73",
        'aso-tertiary': "#03658C",
        'aso-yellow': "#F2A81D"
      }
    },
  },
  plugins: [],
}
