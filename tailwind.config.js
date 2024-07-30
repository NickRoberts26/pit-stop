/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exo: ['Exo', 'sans-serif']
      },
      colors: {
        'racing-red': '#ff232b',
        'mercedes': '#27F4D2',
        'red-bull-racing': '#3671C6'
      }
    },
  },
  plugins: [],
}
