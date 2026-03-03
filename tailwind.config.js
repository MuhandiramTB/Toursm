/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1A1209',
          50: '#3D2B10',
          100: '#2E1F0C',
          200: '#1A1209',
        },
        saffron: {
          DEFAULT: '#C4772A',
          light: '#D4903D',
          dark: '#A85F1A',
        },
        cream: {
          DEFAULT: '#FDFAF5',
          dark: '#F0EBE0',
          darker: '#E5DDD0',
        },
        gold: '#D4AF37',
        sage: '#7A9E7E',
        ocean: '#1E6B8C',
        sunset: '#E8703A',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Libre Baskerville', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'slide-right': 'slideRight 0.6s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1A1209 0%, #2E1F0C 50%, #1A1209 100%)',
        'amber-gradient': 'linear-gradient(135deg, #C4772A 0%, #D4AF37 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FDFAF5 0%, #F0EBE0 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
      },
      boxShadow: {
        'luxury': '0 25px 50px rgba(26, 18, 9, 0.3)',
        'saffron-glow': '0 0 30px rgba(196, 119, 42, 0.4)',
        'card': '0 10px 40px rgba(26, 18, 9, 0.15)',
        'card-hover': '0 30px 60px rgba(26, 18, 9, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
      },
      screens: {
        'xs': '320px',
      },
    },
  },
  plugins: [],
}
