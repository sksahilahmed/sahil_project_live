/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'odia': ['Noto Sans Odia', 'sans-serif'],
        'hindi': ['Noto Sans Devanagari', 'sans-serif'],
        'english': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


