/**** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f9ff',
          100: '#e6f0ff',
          200: '#c7dbff',
          300: '#9abaff',
          400: '#6e98ff',
          500: '#3f73ff',
          600: '#1e55f3',
          700: '#1742c0',
          800: '#14369a',
          900: '#112d7e'
        }
      }
    },
  },
  plugins: [],
};
