/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Ana renkler
        'brand': {
          orange: '#ff7a28',
          blue: '#237bff',
          white: '#FFFFFF',
        },
        // Arkaplan renkleri
        'background': {
          primary: '#F2F8FF',
          secondary: '#FEFFFF',
        },
      },
      borderRadius: {
        DEFAULT: '0.5rem', // Varsayılan border-radius değeri
      },
      boxShadow: {
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)', // Butonlar için hafif gölge
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
