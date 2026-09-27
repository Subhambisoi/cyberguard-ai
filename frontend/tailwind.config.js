/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: "#020617",
          900: "#07111f",
          800: "#0a1628",
          700: "#0f2038",
          600: "#123252",
          cyan: "#22d3ee"
        }
      },
      boxShadow: {
        cyber: "0 0 30px rgba(34, 211, 238, 0.08)"
      }
    }
  },
  plugins: []
};