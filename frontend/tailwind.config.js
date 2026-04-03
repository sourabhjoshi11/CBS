/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        blush: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
        },
        cream: '#FFF8F0',
        petal: '#FFE8EF',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Lato"', 'sans-serif'],
        accent: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'bloom': 'bloom 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bloom: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      backgroundImage: {
        'floral-gradient': 'linear-gradient(135deg, #fff1f2 0%, #fce7f3 50%, #fff8f0 100%)',
        'hero-gradient': 'linear-gradient(135deg, #ffe4e6 0%, #fdf2f8 40%, #fff1f2 100%)',
        'card-gradient': 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)',
      }
    },
  },
  plugins: [],
}
