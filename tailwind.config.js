/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'apricot': {
          100: '#F4A27E',
          200: '#F9C29D',
          300: '#FCD4A4',
          400: '#FFE6AB',
        }
      },
      fontFamily: {
        'Montserrat': ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}
