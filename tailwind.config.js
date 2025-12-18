/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco-primary': '#396848',
        'eco-secondary': '#BCD9A4',
      },
    },
  },
  plugins: [],
}
