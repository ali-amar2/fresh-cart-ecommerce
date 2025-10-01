/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        primary: {
          50: "#e6f9e6",
          100: "#ccf2cc",
          200: "#99e699",
          300: "#66d966",
          400: "#33cc33",
          500: "#0aad0a",
          600: "#009900",
          700: "#007a00",
          800: "#005c00",
          900: "#003d00",
        }
      },
      fontFamily: {
        cairo: ['"Cairo Variable"', 'sans-serif'],
      },
      screens: {
        "2xl": "1400px",

      }
    },
  },
  plugins: [],
}

