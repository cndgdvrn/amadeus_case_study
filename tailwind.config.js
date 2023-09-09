/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors : {
        "app-green" : "#2DC44D"
      },
      fontFamily: {
        "gemunu" : ['Gemunu Libre', 'sans-serif']
      }
    },
  },
  plugins: [],
}