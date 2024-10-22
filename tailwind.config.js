/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
      },
      backgroundColor: {
        custom: "#292524",
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'),],
}
