/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./dashboard.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        voyger: {
          dark: '#0A1628',
          darker: '#060D18',
          cardDark: 'rgba(15, 23, 42, 0.75)',
          cyan: '#00BCD4',
          cyanHover: '#26C6DA',
          blue: '#0288D1',
          sky: '#4FC3F7',
          accent: '#00E5FF',
          navy: '#102548',
          glassBorder: 'rgba(255, 255, 255, 0.15)',
          glassBorderLight: 'rgba(0, 0, 0, 0.08)',
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '4px',
        glass: '20px',
        glassLg: '30px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 188, 212, 0.15)',
        'glass-hover': '0 12px 40px 0 rgba(0, 188, 212, 0.28)',
        'glow-cyan': '0 0 25px rgba(0, 188, 212, 0.4)',
        'glow-blue': '0 0 25px rgba(2, 136, 209, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
